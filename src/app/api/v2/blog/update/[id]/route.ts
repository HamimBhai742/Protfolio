import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Blog } from '@/models/Blog';
import { verifyAuth, AuthError } from '@/lib/verifyAuth';
import { z } from 'zod';
import httpStatusCode from 'http-status-codes';

const updateBlogSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters').optional(),
  thumbnail: z.string().url('Thumbnail must be a valid URL').optional(),
  description: z.string().min(50, 'Description must be at least 50 characters').optional(),
  tags: z.array(z.string()).optional(),
  category: z.enum([
    'Technology',
    'Web_Development',
    'Programming',
    'Lifestyle',
    'Travel',
    'Photography',
    'Food',
    'Education',
    'Business',
    'Other',
  ]).optional(),
  content: z.string().min(100, 'Content must be at least 100 characters').optional(),
  status: z.enum(['draft', 'published']).optional(),
});

interface UniqueSlugQuery {
  slug: string;
  id: { $ne: number };
}

async function generateUniqueSlug(title: string, excludeBlogId: number): Promise<string> {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .split(/\s+/)
    .join('-');
    
  let counter = 0;
  let slug = baseSlug;
  
  const query: UniqueSlugQuery = { slug, id: { $ne: excludeBlogId } };
  
  while (await Blog.findOne(query)) {
    counter++;
    slug = `${baseSlug}-${counter}`;
    query.slug = slug;
  }
  
  return slug;
}

export async function PUT(
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

    const body = await request.json();
    const validatedData = await updateBlogSchema.parseAsync(body);

    const updatePayload: Record<string, unknown> = { ...validatedData };

    if (validatedData.title) {
      updatePayload.slug = await generateUniqueSlug(validatedData.title, numericId);
    }

    const updatedBlog = await Blog.findOneAndUpdate(
      { id: numericId },
      updatePayload,
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: httpStatusCode.NOT_FOUND }
      );
    }

    return NextResponse.json({
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Blog updated successfully',
      data: updatedBlog,
    });
  } catch (error: unknown) {
    console.error('Update blog error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: error.issues },
        { status: httpStatusCode.BAD_REQUEST }
      );
    }
    const err = error as Error & { status?: number };
    return NextResponse.json(
      { success: false, message: err.message || 'Unauthorized Access' },
      { status: err instanceof AuthError ? err.status : httpStatusCode.UNAUTHORIZED }
    );
  }
}
