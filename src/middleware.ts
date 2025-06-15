import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/jwt';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('forum_auth_token')?.value;
  const { pathname } = request.nextUrl;

  // Redirect to admin login if trying to access admin panel without token
  if (pathname.startsWith('/admin') && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If there's a token, verify it and check role
  if (token) {
    const decoded = verifyToken(token);

    // If token is invalid or user is not admin, redirect from admin routes
    if (!decoded || decoded.role !== 'ADMIN') {
      if (pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }
    
    if (decoded && decoded.role === 'ADMIN' && pathname.startsWith('/admin/login')) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/admin/:path*'], 
}; 