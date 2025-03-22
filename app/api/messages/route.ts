// @ts-nocheck
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Remove any references to authOptions entirely
// If there were any lines importing or using authOptions, remove them.

export async function GET(req: Request) {
  try {
    const messages = await prisma.message.findMany();
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { text, sender, receiver } = await req.json();
    if (!text || !sender || !receiver) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const message = await prisma.message.create({
      data: { text, sender, receiver },
    });
    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create message" }, { status: 500 });
  }
}
