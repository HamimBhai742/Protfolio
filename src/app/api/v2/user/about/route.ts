import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { User } from '@/models/User';
import httpStatusCode from 'http-status-codes';

export async function GET() {
  try {
    await dbConnect();

    const about = await User.findOne().select(
      'name email phone address picture bio githubUrl linkedInUrl facebookUrl profession skills website createdAt updatedAt'
    );

    if (!about) {
      return NextResponse.json(
        { success: false, message: 'About info not found' },
        { status: httpStatusCode.NOT_FOUND }
      );
    }

    return NextResponse.json({
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'About fetched successfully',
      data: about,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Fetch about error:', err);
    return NextResponse.json(
      { success: false, message: err.message || 'Something went wrong' },
      { status: httpStatusCode.INTERNAL_SERVER_ERROR }
    );
  }
}
