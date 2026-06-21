import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Project } from '@/models/Project';
import { verifyAuth, AuthError } from '@/lib/verifyAuth';
import { z } from 'zod';
import httpStatusCode from 'http-status-codes';

const createProjectSchema = z.object({
  title: z.string(),
  thumbnail: z.string().url(),
  description: z.string().min(200, { message: 'Description must be at least 200 characters' }),
  features: z.string(),
  technologies: z.array(z.string()),
  status: z.enum(['completed', 'in_progress', 'planned']),
  githubUrl: z.string().url().optional().or(z.literal('')),
  liveUrl: z.string().url().optional().or(z.literal('')),
  category: z.enum(['web', 'api', 'mobile', 'other']),
  startDate: z.string(),
  endDate: z.string().optional().or(z.literal('')),
});

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const decodedUser = await verifyAuth(request, 'ADMIN');

    const body = await request.json();
    const validatedData = await createProjectSchema.parseAsync(body);

    // Auto-increment numeric ID
    const maxProject = await Project.findOne().sort({ id: -1 });
    const newId = maxProject && maxProject.id ? maxProject.id + 1 : 1;

    const newProject = await Project.create({
      ...validatedData,
      id: newId,
      userId: decodedUser.userId,
      githubUrl: validatedData.githubUrl || undefined,
      liveUrl: validatedData.liveUrl || undefined,
      endDate: validatedData.endDate || undefined,
    });

    return NextResponse.json({
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Project created successfully',
      data: newProject,
    });
  } catch (error: unknown) {
    console.error('Create project error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: error.issues },
        { status: httpStatusCode.BAD_REQUEST }
      );
    }
    const err = error as Error & { status?: number };
    return NextResponse.json(
      { success: false, message: err.message || 'Unauthorized Access' },
      { status: err instanceof AuthError ? err.status : httpStatusCode.UNAUTHORIZED }
    );
  }
}
