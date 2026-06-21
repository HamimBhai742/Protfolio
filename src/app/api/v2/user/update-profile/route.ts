import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { User } from '@/models/User';
import { verifyAuth, AuthError } from '@/lib/verifyAuth';
import { z } from 'zod';
import httpStatusCode from 'http-status-codes';

const updateUserZodSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  phone: z.string().optional().nullable(),
  picture: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  skills: z.array(z.string()).optional(),
  website: z.string().optional().nullable(),
  githubUrl: z.string().optional().nullable(),
  linkedInUrl: z.string().optional().nullable(),
  facebookUrl: z.string().optional().nullable(),
  profession: z
    .enum([
      'digital_marketer',
      'full_stack_developer',
      'front_end_developer',
      'back_end_developer',
      'mobile_developer',
      'ui_ux_designer',
      'product_designer',
      'data_analyst',
      'data_engineer',
    ])
    .optional(),
  experience: z.string().optional().nullable(),
});

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const decodedUser = await verifyAuth(request, 'ADMIN');

    const body = await request.json();
    const validatedData = await updateUserZodSchema.parseAsync(body);

    const updatedProfile = await User.findOneAndUpdate(
      { id: decodedUser.userId },
      validatedData,
      { new: true }
    );

    if (!updatedProfile) {
      return NextResponse.json(
        { success: false, message: 'Profile not found' },
        { status: httpStatusCode.NOT_FOUND }
      );
    }

    return NextResponse.json({
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Profile updated successfully',
      data: updatedProfile,
    });
  } catch (error: unknown) {
    console.error('Update profile error:', error);
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
