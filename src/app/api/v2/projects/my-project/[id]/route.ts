import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Project } from '@/models/Project';
import { verifyAuth, AuthError } from '@/lib/verifyAuth';
import httpStatusCode from 'http-status-codes';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const decodedUser = await verifyAuth(request, 'ADMIN');

    const { id } = await params;
    const numericId = Number(id);

    if (isNaN(numericId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid project ID' },
        { status: httpStatusCode.BAD_REQUEST }
      );
    }

    const project = await Project.findOne({ id: numericId, userId: decodedUser.userId });

    if (!project) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: httpStatusCode.NOT_FOUND }
      );
    }

    return NextResponse.json({
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Project fetched successfully',
      data: project,
    });
  } catch (error: unknown) {
    console.error('Fetch my project error:', error);
    const err = error as Error & { status?: number };
    return NextResponse.json(
      { success: false, message: err.message || 'Unauthorized Access' },
      { status: err instanceof AuthError ? err.status : httpStatusCode.UNAUTHORIZED }
    );
  }
}
