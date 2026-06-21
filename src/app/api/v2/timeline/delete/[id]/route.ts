import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Timeline } from '@/models/Timeline';
import { verifyAuth, AuthError } from '@/lib/verifyAuth';
import httpStatusCode from 'http-status-codes';

export async function DELETE(
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

    const deletedTimeline = await Timeline.findOneAndDelete({ id: numericId });

    if (!deletedTimeline) {
      return NextResponse.json(
        { success: false, message: 'Timeline entry not found' },
        { status: httpStatusCode.NOT_FOUND }
      );
    }

    return NextResponse.json({
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Timeline entry deleted successfully',
      data: deletedTimeline,
    });
  } catch (error: unknown) {
    console.error('Delete timeline entry error:', error);
    const err = error as Error & { status?: number };
    return NextResponse.json(
      { success: false, message: err.message || 'Unauthorized Access' },
      { status: err instanceof AuthError ? err.status : httpStatusCode.UNAUTHORIZED }
    );
  }
}
