import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { forumName, forumUrl, logoUrl, theme } = await req.json();
  if (!forumName || !forumUrl || !theme) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await prisma.setting.upsert({
    where: { id: 1 },
    update: {
      forumName,
      forumUrl,
      logoUrl,
      theme,
      setupDone: true,
    },
    create: {
      id: 1,
      forumName,
      forumUrl,
      logoUrl,
      theme,
      setupDone: true,
    },
  });

  return NextResponse.json({ success: true });
} 