import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Blog } from '@/models/Blog';
import httpStatusCode from 'http-status-codes';

interface BlogQuery {
  status: string;
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
  category?: string;
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);

    const search = searchParams.get('search') || '';
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const query: BlogQuery = { status: 'published' };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const category = searchParams.get('category');
    if (category && category !== 'all') {
      query.category = category;
    }

    const blogs = await Blog.find(query)
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Blog.countDocuments(query);

    return NextResponse.json({
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Blogs fetched successfully',
      data: blogs,
      metaData: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Fetch blogs error:', err);
    return NextResponse.json(
      { success: false, message: err.message || 'Something went wrong' },
      { status: httpStatusCode.INTERNAL_SERVER_ERROR }
    );
  }
}
