import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Blog } from '@/models/Blog';
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
        { success: false, message: 'Invalid blog ID' },
        { status: httpStatusCode.BAD_REQUEST }
      );
    }

    const deletedBlog = await Blog.findOneAndDelete({ id: numericId });

    if (!deletedBlog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: httpStatusCode.NOT_FOUND }
      );
    }

    return NextResponse.json({
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Blog deleted successfully',
      data: deletedBlog,
    });
  } catch (error: unknown) {
    console.error('Delete blog error:', error);
    const err = error as Error & { status?: number };
    return NextResponse.json(
      { success: false, message: err.message || 'Unauthorized Access' },
      { status: err instanceof AuthError ? err.status : httpStatusCode.UNAUTHORIZED }
    );
  }
}
