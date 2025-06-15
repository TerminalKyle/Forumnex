import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { comparePassword } from '@/lib/auth';
import { generateToken } from '@/lib/jwt';
import { serialize } from 'cookie';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Check if the user has an ADMIN role (assuming you'll use this for admin access)
    if (user.role !== 'ADMIN') {
      return NextResponse.json({ message: "Unauthorized access" }, { status: 403 });
    }

    const tokenPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };

    const token = generateToken(tokenPayload);

    const serialized = serialize("forum_auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 1, // 1 day
      path: "/",
    });

    return new NextResponse(JSON.stringify({ message: "Login successful" }), {
      status: 200,
      headers: { 'Set-Cookie': serialized },
    });

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 