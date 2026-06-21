import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Blog } from '@/models/Blog';
import { verifyAuth, AuthError } from '@/lib/verifyAuth';
import { z } from 'zod';
import httpStatusCode from 'http-status-codes';

const createBlogSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters'),
  thumbnail: z.string().url('Thumbnail must be a valid URL'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  tags: z.array(z.string()).nonempty('At least one tag is required'),
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
  ]),
  content: z.string().min(100, 'Content must be at least 100 characters'),
  status: z.enum(['draft', 'published']).default('published'),
});

async function generateUniqueSlug(title: string): Promise<string> {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .split(/\s+/)
    .join('-');
    
  let counter = 0;
  let slug = baseSlug;
  
  while (await Blog.findOne({ slug })) {
    counter++;
    slug = `${baseSlug}-${counter}`;
  }
  
  return slug;
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const decodedUser = await verifyAuth(request, 'ADMIN');

    const body = await request.json();
    const validatedData = await createBlogSchema.parseAsync(body);

    const slug = await generateUniqueSlug(validatedData.title);

    // Auto-increment numeric ID
    const maxBlog = await Blog.findOne().sort({ id: -1 });
    const newId = maxBlog && maxBlog.id ? maxBlog.id + 1 : 1;

    const newBlog = await Blog.create({
      ...validatedData,
      id: newId,
      slug,
      userId: decodedUser.userId,
    });

    return NextResponse.json({
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Blog created successfully',
      data: newBlog,
    });
  } catch (error: unknown) {
    console.error('Create blog error:', error);
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
