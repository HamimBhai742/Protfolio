import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth, AuthError } from '@/lib/verifyAuth';
import httpStatusCode from 'http-status-codes';

export async function POST(request: NextRequest) {
  try {
    const decodedUser = await verifyAuth(request, 'ADMIN');

    return NextResponse.json({
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'User logged in',
      data: decodedUser,
    });
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      console.log(`[Auth] Verification failed: ${error.message} (Status: ${error.status})`);
    } else {
      console.error('[Auth] Verification unexpected error:', error);
    }
    const err = error as Error & { status?: number };
    return NextResponse.json(
      { success: false, message: err.message || 'Unauthorized Access' },
      { status: err instanceof AuthError ? err.status : httpStatusCode.UNAUTHORIZED }
    );
  }
}
