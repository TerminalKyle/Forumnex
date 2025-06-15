import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const navLinks = await prisma.navLink.findMany({
      orderBy: {
        order: 'asc',
      },
    });
    return NextResponse.json(navLinks);
  } catch (error) {
    console.error("Error fetching navigation links:", error);
    return NextResponse.json({ message: "Failed to fetch navigation links" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, path, icon, section, order } = await request.json();

    if (!name || !path || !section || order === undefined) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newNavLink = await prisma.navLink.create({
      data: {
        name,
        path,
        icon: icon || '', // Default to empty string if not provided
        section,
        order,
      },
    });

    return NextResponse.json(newNavLink, { status: 201 });
  } catch (error) {
    console.error("Error creating navigation link:", error);
    return NextResponse.json({ message: "Failed to create navigation link" }, { status: 500 });
  }
} 