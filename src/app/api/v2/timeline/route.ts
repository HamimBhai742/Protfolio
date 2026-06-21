import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Timeline } from '@/models/Timeline';
import httpStatusCode from 'http-status-codes';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    
    // Sort timeline items (latest first by createdAt, or could sort manually in UI)
    const timelineItems = await Timeline.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Timeline entries fetched successfully',
      data: timelineItems,
    });
  } catch (error: unknown) {
    console.error('Fetch timeline error:', error);
    const err = error as Error;
    return NextResponse.json(
      { success: false, message: err.message || 'Something went wrong' },
      { status: httpStatusCode.INTERNAL_SERVER_ERROR }
    );
  }
}
