import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Message } from '@/models/Message';
import { verifyAuth, AuthError } from '@/lib/verifyAuth';
import httpStatusCode from 'http-status-codes';

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
        { success: false, message: 'Invalid message ID' },
        { status: httpStatusCode.BAD_REQUEST }
      );
    }

    const body = await request.json();
    const { isRead } = body;

    if (typeof isRead !== 'boolean') {
      return NextResponse.json(
        { success: false, message: 'isRead field is required and must be a boolean' },
        { status: httpStatusCode.BAD_REQUEST }
      );
    }

    const updatedMessage = await Message.findOneAndUpdate(
      { id: numericId },
      { $set: { isRead } },
      { returnDocument: 'after' }
    );

    if (!updatedMessage) {
      return NextResponse.json(
        { success: false, message: 'Message not found' },
        { status: httpStatusCode.NOT_FOUND }
      );
    }

    return NextResponse.json({
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Message status updated successfully',
      data: updatedMessage,
    });
  } catch (error: unknown) {
    console.error('Update message status error:', error);
    const err = error as Error & { status?: number };
    return NextResponse.json(
      { success: false, message: err.message || 'Unauthorized Access' },
      { status: err instanceof AuthError ? err.status : httpStatusCode.UNAUTHORIZED }
    );
  }
}
