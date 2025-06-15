import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const isSetupRoute = url.pathname.startsWith('/setup') || url.pathname.startsWith('/api/setup');

  // Allow setup and setup API routes
  if (isSetupRoute) {
    return NextResponse.next();
  }

  // Check if setup is done
  const setting = await prisma.setting.findUnique({ where: { id: 1 } });
  if (!setting || !setting.setupDone) {
    // Redirect to /setup if not done
    return NextResponse.redirect(new URL('/setup', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
}; 