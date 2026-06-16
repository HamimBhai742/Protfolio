import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  console.log(token);
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  try {
    //Call your backend to verify token

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      credentials: 'include',
      cache: 'no-store', 
    });
    if (!res.ok) {
      // Backend bolse token invalid/expired
      return NextResponse.redirect(new URL('/login', request.url));
    }
    //Valid token → continue
    return NextResponse.next();
  } catch (err) {
    console.log(err);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*'], // protect dashboard routes
};
