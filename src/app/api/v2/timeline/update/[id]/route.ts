import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Timeline } from '@/models/Timeline';
import { verifyAuth, AuthError } from '@/lib/verifyAuth';
import { z } from 'zod';
import httpStatusCode from 'http-status-codes';

const updateTimelineSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }).optional(),
  organization: z.string().min(2, { message: 'Organization must be at least 2 characters.' }).optional(),
  location: z.string().optional().or(z.literal('')),
  startDate: z.string().min(2, { message: 'Start date is required.' }).optional(),
  endDate: z.string().optional().or(z.literal('')),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }).optional(),
  type: z.enum(['work', 'education']).optional(),
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
        { success: false, message: 'Invalid timeline ID' },
        { status: httpStatusCode.BAD_REQUEST }
      );
    }

    const body = await request.json();
    const validatedData = await updateTimelineSchema.parseAsync(body);

    const updatePayload: Record<string, unknown> = { ...validatedData };
    if (validatedData.endDate === '') {
      updatePayload.endDate = 'Present';
    }

    const updatedTimeline = await Timeline.findOneAndUpdate(
      { id: numericId },
      { $set: updatePayload },
      { returnDocument: 'after' }
    );

    if (!updatedTimeline) {
      return NextResponse.json(
        { success: false, message: 'Timeline entry not found' },
        { status: httpStatusCode.NOT_FOUND }
      );
    }

    return NextResponse.json({
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Timeline entry updated successfully',
      data: updatedTimeline,
    });
  } catch (error: unknown) {
    console.error('Update timeline entry error:', error);
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
