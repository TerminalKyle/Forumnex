import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 

export async function GET() {
  try {
    const totalMembers = await prisma.user.count();
    const totalPosts = await prisma.post.count();

    return NextResponse.json({
      totalMembers,
      totalPosts,
      onlineUsers: "N/A (real-time data)", 
    });
  } catch (error) {
    console.error("Error fetching forum stats:", error);
    return NextResponse.json({ message: "Failed to fetch forum stats" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 