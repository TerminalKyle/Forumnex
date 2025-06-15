// SETUP DATABASE VIA API

import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promises as fs } from "fs";
import path from "path";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { dbHost, dbPort, dbUser, dbPassword, dbName } = await req.json();

  if (!dbHost || !dbPort || !dbUser || !dbName) {
    return NextResponse.json({ error: "Missing required database fields" }, { status: 400 });
  }

  let connectionString = `mysql://${dbUser}`;
  if (dbPassword) {
    connectionString += `:${dbPassword}`;
  }
  connectionString += `@${dbHost}:${dbPort}/${dbName}`;

  const envPath = path.join(process.cwd(), ".env");

  try {
    let envContent = await fs.readFile(envPath, "utf-8");
    envContent = envContent.replace(/DATABASE_URL=".*"/, `DATABASE_URL="${connectionString}"`);
    await fs.writeFile(envPath, envContent);

    const prismaCommand = `npx prisma db push --skip-generate --accept-data-loss`; 

    await new Promise((resolve, reject) => {
      exec(prismaCommand, { cwd: process.cwd() }, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          console.error(`stdout: ${stdout}`);
          console.error(`stderr: ${stderr}`);
          return reject(new Error(`Prisma command failed: ${stderr || stdout}`));
        }
        console.log(`Prisma stdout: ${stdout}`);
        console.log(`Prisma stderr: ${stderr}`);
        resolve(stdout);
      });
    });

    await prisma.setting.upsert({
      where: { id: 1 },
      update: {},
      create: { id: 1, setupDone: false },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Database setup error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
} 