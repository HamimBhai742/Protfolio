import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Blog } from '@/models/Blog';
import httpStatusCode from 'http-status-codes';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);

    // Atomically increment view count and retrieve updated blog post
    const blog = await Blog.findOneAndUpdate(
      { slug: decodedSlug },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: httpStatusCode.NOT_FOUND }
      );
    }

    return NextResponse.json({
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Blog fetched successfully',
      data: blog,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Fetch blog by slug error:', err);
    return NextResponse.json(
      { success: false, message: err.message || 'Something went wrong' },
      { status: httpStatusCode.INTERNAL_SERVER_ERROR }
    );
  }
}
