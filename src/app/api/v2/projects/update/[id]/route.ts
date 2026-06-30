import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Project } from '@/models/Project';
import { verifyAuth, AuthError } from '@/lib/verifyAuth';
import { z } from 'zod';
import httpStatusCode from 'http-status-codes';

const updateProjectSchema = z.object({
  title: z.string().optional(),
  thumbnail: z.string().url().optional(),
  description: z.string().min(200, { message: 'Description must be at least 200 characters' }).optional(),
  details: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  features: z.string().optional(),
  status: z.enum(['completed', 'in_progress', 'planned']).optional(),
  githubUrl: z.string().url().optional().nullable().or(z.literal('')),
  liveUrl: z.string().url().optional().nullable().or(z.literal('')),
  category: z.enum(['web', 'api', 'mobile', 'other']).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional().nullable().or(z.literal('')),
  images: z.array(z.string()).optional(),
  videoUrl: z.string().url().optional().nullable().or(z.literal('')),
  metrics: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  team: z.array(z.object({
    name: z.string().optional(),
    role: z.string().optional(),
    avatar: z.string().optional().nullable(),
    github: z.string().optional().nullable().or(z.literal('')),
    linkedin: z.string().optional().nullable().or(z.literal('')),
  })).optional(),
  testimonials: z.array(z.object({
    clientName: z.string().optional(),
    clientCompany: z.string().optional(),
    clientAvatar: z.string().optional().nullable(),
    feedback: z.string().optional(),
    rating: z.number().min(1).max(5).optional(),
  })).optional(),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    await verifyAuth(request, 'ADMIN');

    const { id } = await params;
    const numericId = Number(id);

    if (isNaN(numericId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid project ID' },
        { status: httpStatusCode.BAD_REQUEST }
      );
    }

    const body = await request.json();
    const validatedData = await updateProjectSchema.parseAsync(body);

    const updatedProject = await Project.findOneAndUpdate(
      { id: numericId },
      validatedData,
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: httpStatusCode.NOT_FOUND }
      );
    }

    return NextResponse.json({
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Project updated successfully',
      data: updatedProject,
    });
  } catch (error: unknown) {
    console.error('Update project error:', error);
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
