import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Timeline } from '@/models/Timeline';
import { verifyAuth, AuthError } from '@/lib/verifyAuth';
import { z } from 'zod';
import httpStatusCode from 'http-status-codes';

const createTimelineSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  organization: z.string().min(2, { message: 'Organization must be at least 2 characters.' }),
  location: z.string().optional().or(z.literal('')),
  startDate: z.string().min(2, { message: 'Start date is required.' }),
  endDate: z.string().optional().or(z.literal('')),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  type: z.enum(['work', 'education']),
});

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    await verifyAuth(request, 'ADMIN');

    const body = await request.json();
    const validatedData = await createTimelineSchema.parseAsync(body);

    // Auto-increment numeric ID
    const maxTimeline = await Timeline.findOne().sort({ id: -1 });
    const newId = maxTimeline && maxTimeline.id ? maxTimeline.id + 1 : 1;

    const newTimeline = await Timeline.create({
      ...validatedData,
      id: newId,
      location: validatedData.location || undefined,
      endDate: validatedData.endDate || 'Present',
    });

    return NextResponse.json({
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Timeline entry created successfully',
      data: newTimeline,
    });
  } catch (error: unknown) {
    console.error('Create timeline entry error:', error);
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
