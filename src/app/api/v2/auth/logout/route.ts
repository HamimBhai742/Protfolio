import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import httpStatusCode from 'http-status-codes';

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');

    return NextResponse.json({
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'User logged out successfully',
      data: null,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Logout error:', err);
    return NextResponse.json(
      { success: false, message: err.message || 'Something went wrong' },
      { status: httpStatusCode.INTERNAL_SERVER_ERROR }
    );
  }
}
