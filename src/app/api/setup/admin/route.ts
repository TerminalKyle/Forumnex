// CREATE DEFAULT ADMIN VIA API

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { email, username, password } = await req.json();
  if (!email || !username || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const userCount = await prisma.user.count();
  if (userCount > 0) {
    return NextResponse.json({ error: "Admin already exists" }, { status: 403 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  return NextResponse.json({ success: true, user: { id: user.id, email: user.email, username: user.username } });
} 