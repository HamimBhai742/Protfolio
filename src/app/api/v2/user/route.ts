import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { User } from '@/models/User';
import { Project } from '@/models/Project';
import httpStatusCode from 'http-status-codes';

export async function GET() {
  try {
    await dbConnect();

    const user = await User.findOne().select(
      'id name email address picture profession experience skills bio role githubUrl facebookUrl linkedInUrl website createdAt updatedAt'
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: httpStatusCode.NOT_FOUND }
      );
    }

    const projects = await Project.find({ userId: user.id });
    const userData = {
      ...user.toJSON(),
      projects,
    };

    return NextResponse.json({
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'User fetched successfully',
      data: userData,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Fetch user error:', err);
    return NextResponse.json(
      { success: false, message: err.message || 'Something went wrong' },
      { status: httpStatusCode.INTERNAL_SERVER_ERROR }
    );
  }
}
