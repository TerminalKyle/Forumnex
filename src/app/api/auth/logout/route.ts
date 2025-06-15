import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  try {
    const serialized = serialize("forum_auth_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: -1, 
      path: "/",
    });

    return new NextResponse(JSON.stringify({ message: "Logged out successfully" }), {
      status: 200,
      headers: { 'Set-Cookie': serialized },
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
} 