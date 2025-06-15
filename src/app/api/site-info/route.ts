import { NextResponse } from 'next/server';

export async function GET() {
  // In a real application, you would fetch this from your database
  const siteName = "Forumnex"; 

  return NextResponse.json({ siteName });
} 