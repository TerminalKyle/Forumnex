import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 

export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      orderBy: {
        title: 'asc',
      },
    });
    return NextResponse.json(pages);
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json({ message: "Failed to fetch pages" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 