import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const navLinks = await prisma.navLink.findMany({
      orderBy: {
        order: 'asc',
      },
    });

    interface NavLinkItem {
      id: string;
      name: string;
      path: string;
      icon: string;
      section: string;
      order: number;
      createdAt: Date;
      updatedAt: Date;
    }

    interface GroupedNavLink {
      section: string;
      items: NavLinkItem[];
    }

    const groupedNavLinks = navLinks.reduce((acc: { [key: string]: GroupedNavLink }, link: NavLinkItem) => {
      const section = acc[link.section] || { section: link.section, items: [] };
      section.items.push(link);
      acc[link.section] = section;
      return acc;
    }, {});

    return NextResponse.json(Object.values(groupedNavLinks));
  } catch (error) {
    console.error("Error fetching nav links from DB:", error);
    return NextResponse.json({ message: "Failed to fetch navigation links" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 