import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Import the singleton Prisma client

// const prisma = new PrismaClient(); // Remove direct instantiation

export async function GET() {
  try {
    const settings = await prisma.setting.findUnique({
      where: { id: 1 }, 
    });

    const siteName = settings?.forumName || "Forumnex"; 

    return NextResponse.json({ siteName });
  } catch (error) {
    console.error("Error fetching site name from DB:", error);
    return NextResponse.json({ siteName: "Forumnex" }, { status: 500 }); 
  }
} 