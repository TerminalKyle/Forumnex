// CHECK SETUP STATUS VIA API

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const setting = await prisma.setting.findUnique({ where: { id: 1 } });
    return NextResponse.json({ setupDone: setting?.setupDone || false });
  } catch (error) {
    console.error("Failed to fetch setup status:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 