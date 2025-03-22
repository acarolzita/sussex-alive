// app/auth/[...nextauth]/route.ts
import { NextResponse } from "next/server";

// Dummy implementation for NextAuth routes
export async function GET() {
  return NextResponse.json({ message: "NextAuth GET not implemented yet." });
}

export async function POST() {
  return NextResponse.json({ message: "NextAuth POST not implemented yet." });
}

// Optionally, export a dummy authOptions if it's being imported elsewhere:
export const authOptions = {}; // This can be replaced with real config later

