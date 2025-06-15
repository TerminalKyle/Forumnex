import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to public assets and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // Check if setup is required
  try {
    const response = await fetch(new URL('/api/setup/status', request.url));
    const data = await response.json();
    const isSetup = data.setupDone;

    // If setup is required and not on setup page, redirect to setup
    if (!isSetup && pathname !== '/setup') {
      return NextResponse.redirect(new URL('/setup', request.url));
    }

    // If setup is complete and on setup page, redirect to home
    if (isSetup && pathname === '/setup') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } catch (error) {
    console.error('Error checking setup status:', error);
    // If we can't check setup status, allow access to setup page
    if (pathname !== '/setup') {
      return NextResponse.redirect(new URL('/setup', request.url));
    }
  }

  // Handle admin routes
  if (pathname.startsWith('/admin')) {
    // Allow access to login page
    if (pathname === '/admin/login') {
      // If user is already logged in, redirect to admin dashboard
      const token = request.cookies.get('auth_token')?.value;
      if (token) {
        const payload = await verifyToken(token);
        if (payload) {
          return NextResponse.redirect(new URL('/admin', request.url));
        }
      }
      return NextResponse.next();
    }

    // Check authentication for other admin routes
    const token = request.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Check if user is an admin
    if (payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};