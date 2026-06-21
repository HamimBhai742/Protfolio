import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { User } from '@/models/User';
import { verifyAuth, AuthError } from '@/lib/verifyAuth';
import httpStatusCode from 'http-status-codes';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const decodedUser = await verifyAuth(request, 'ADMIN');

    const profile = await User.findOne({ id: decodedUser.userId });
    if (!profile) {
      return NextResponse.json(
        { success: false, message: 'Profile not found' },
        { status: httpStatusCode.NOT_FOUND }
      );
    }

    return NextResponse.json({
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Profile fetched successfully',
      data: profile,
    });
  } catch (error: unknown) {
    console.error('Fetch profile error:', error);
    const err = error as Error & { status?: number };
    return NextResponse.json(
      { success: false, message: err.message || 'Unauthorized Access' },
      { status: err instanceof AuthError ? err.status : httpStatusCode.UNAUTHORIZED }
    );
  }
}
