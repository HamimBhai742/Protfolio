import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Project } from '@/models/Project';
import { verifyAuth, AuthError } from '@/lib/verifyAuth';
import httpStatusCode from 'http-status-codes';

interface ProjectQuery {
  userId: number;
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
  category?: string;
  status?: string;
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const decodedUser = await verifyAuth(request, 'ADMIN');
    const { searchParams } = new URL(request.url);

    const search = searchParams.get('search') || '';
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const query: ProjectQuery = { userId: decodedUser.userId };

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

    const status = searchParams.get('status');
    if (status && status !== 'all') {
      query.status = status;
    }

    const projects = await Project.find(query)
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Project.countDocuments(query);

    return NextResponse.json({
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Projects fetched successfully',
      data: projects,
      metaData: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: unknown) {
    console.error('Fetch my projects error:', error);
    const err = error as Error & { status?: number };
    return NextResponse.json(
      { success: false, message: err.message || 'Unauthorized Access' },
      { status: err instanceof AuthError ? err.status : httpStatusCode.UNAUTHORIZED }
    );
  }
}
