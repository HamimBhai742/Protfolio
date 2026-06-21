import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;

  // If no token exists, redirect to login with the current path as a redirect parameter
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectTo', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const origin = request.nextUrl.origin;
    
    // Call the verify endpoint to validate the JWT token
    const res = await fetch(`${origin}/api/v2/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      credentials: 'include',
      cache: 'no-store',
    });

    if (!res.ok) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirectTo', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch (err) {
    console.error('[Middleware] Token verification request failed:', err);
    // On unexpected verify server error, redirect to login to be safe
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectTo', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/dashboard/:path*'], // protect dashboard and all nested subroutes
};
