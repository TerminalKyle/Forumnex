import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const addons = await prisma.addon.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return NextResponse.json(addons);
  } catch (error) {
    console.error("Error fetching addons:", error);
    return NextResponse.json({ message: "Failed to fetch addons" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 