// GET STATS VIA API

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const [totalMembers, totalPosts] = await Promise.all([
      prisma.user.count(),
      prisma.post.count(),
    ]);

    const recentActivity = await Promise.all([
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          username: true,
          createdAt: true,
        },
      }),
      // Recent posts
      prisma.post.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          content: true,
          createdAt: true,
          author: {
            select: {
              username: true,
            },
          },
        },
      }),
    ]);

    const formattedActivity = [
      ...recentActivity[0].map(user => ({
        id: `user-${user.id}`,
        type: 'user',
        description: `New user registered: ${user.username}`,
        timestamp: user.createdAt.toISOString(),
      })),
      ...recentActivity[1].map(post => ({
        id: `post-${post.id}`,
        type: 'post',
        description: `New post by ${post.author.username}: ${post.content.substring(0, 50)}${post.content.length > 50 ? '...' : ''}`,
        timestamp: post.createdAt.toISOString(),
      })),
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);

    return NextResponse.json({
      totalMembers,
      totalPosts,
      onlineUsers: 0, // Placeholder for now
      recentActivity: formattedActivity,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { message: 'Failed to fetch stats' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 