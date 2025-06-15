import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Get recent activities from various sources
    const recentActivities = await Promise.all([
      // Recent user registrations
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          username: true,
          createdAt: true,
        },
      }).then(users => users.map(user => ({
        id: user.id,
        type: 'User Registration',
        description: `New user registered: ${user.username}`,
        timestamp: user.createdAt.toISOString(),
      }))),

      // Recent posts
      prisma.post.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          createdAt: true,
          author: {
            select: {
              username: true,
            },
          },
        },
      }).then(posts => posts.map(post => ({
        id: post.id,
        type: 'New Post',
        description: `${post.author.username} created a new post: ${post.title}`,
        timestamp: post.createdAt.toISOString(),
      }))),

      // Recent category changes
      prisma.category.findMany({
        take: 5,
        orderBy: { updatedAt: 'desc' },
        select: {
          id: true,
          name: true,
          updatedAt: true,
        },
      }).then(categories => categories.map(category => ({
        id: category.id,
        type: 'Category Update',
        description: `Category updated: ${category.name}`,
        timestamp: category.updatedAt.toISOString(),
      }))),
    ]);

    // Combine and sort all activities by timestamp
    const allActivities = recentActivities
      .flat()
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10); // Get the 10 most recent activities

    return NextResponse.json(allActivities);
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    return NextResponse.json(
      { message: 'Failed to fetch recent activity' },
      { status: 500 }
    );
  }
} 