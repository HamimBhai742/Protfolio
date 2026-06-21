import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { User } from '@/models/User';
import bcryptjs from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import httpStatusCode from 'http-status-codes';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: httpStatusCode.BAD_REQUEST }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: httpStatusCode.NOT_FOUND }
      );
    }

    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { success: false, message: 'Incorrect password' },
        { status: httpStatusCode.UNAUTHORIZED }
      );
    }

    const jwtSecret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN || '1d';
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is missing from environment variables');
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn } as SignOptions
    );

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
    });

    return NextResponse.json({
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'User logged in successfully',
      data: {
        accessToken: token,
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Login error:', err);
    return NextResponse.json(
      { success: false, message: err.message || 'Something went wrong' },
      { status: httpStatusCode.INTERNAL_SERVER_ERROR }
    );
  }
}
