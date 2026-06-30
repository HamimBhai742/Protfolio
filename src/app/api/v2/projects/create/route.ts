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
  details: z.string().optional(),
  features: z.string(),
  technologies: z.array(z.string()),
  status: z.enum(['completed', 'in_progress', 'planned']),
  githubUrl: z.string().url().optional().or(z.literal('')),
  liveUrl: z.string().url().optional().or(z.literal('')),
  category: z.enum(['web', 'api', 'mobile', 'other']),
  startDate: z.string(),
  endDate: z.string().optional().or(z.literal('')),
  images: z.array(z.string()).optional(),
  videoUrl: z.string().url().optional().or(z.literal('')),
  metrics: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  team: z.array(z.object({
    name: z.string(),
    role: z.string(),
    avatar: z.string().optional(),
    github: z.string().optional().or(z.literal('')),
    linkedin: z.string().optional().or(z.literal('')),
  })).optional(),
  testimonials: z.array(z.object({
    clientName: z.string(),
    clientCompany: z.string(),
    clientAvatar: z.string().optional(),
    feedback: z.string(),
    rating: z.number().min(1).max(5),
  })).optional(),
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
