import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Message } from '@/models/Message';
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
        { success: false, message: 'Invalid message ID' },
        { status: httpStatusCode.BAD_REQUEST }
      );
    }

    const deletedMessage = await Message.findOneAndDelete({ id: numericId });

    if (!deletedMessage) {
      return NextResponse.json(
        { success: false, message: 'Message not found' },
        { status: httpStatusCode.NOT_FOUND }
      );
    }

    return NextResponse.json({
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Message deleted successfully',
      data: deletedMessage,
    });
  } catch (error: unknown) {
    console.error('Delete message error:', error);
    const err = error as Error & { status?: number };
    return NextResponse.json(
      { success: false, message: err.message || 'Unauthorized Access' },
      { status: err instanceof AuthError ? err.status : httpStatusCode.UNAUTHORIZED }
    );
  }
}
