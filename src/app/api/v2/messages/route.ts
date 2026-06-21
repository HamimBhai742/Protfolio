import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Message } from '@/models/Message';
import { verifyAuth, AuthError } from '@/lib/verifyAuth';
import httpStatusCode from 'http-status-codes';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    await verifyAuth(request, 'ADMIN');

    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter') || 'all'; // 'all', 'unread', 'read'
    
    const query: { isRead?: boolean } = {};
    if (filter === 'unread') {
      query.isRead = false;
    } else if (filter === 'read') {
      query.isRead = true;
    }

    const messages = await Message.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Messages fetched successfully',
      data: messages,
    });
  } catch (error: unknown) {
    console.error('Fetch messages error:', error);
    const err = error as Error & { status?: number };
    return NextResponse.json(
      { success: false, message: err.message || 'Unauthorized Access' },
      { status: err instanceof AuthError ? err.status : httpStatusCode.UNAUTHORIZED }
    );
  }
}
