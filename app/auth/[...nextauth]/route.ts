// frontend/app/auth/[...nextauth]/route.ts
import { NextResponse } from "next/server";

// Dummy placeholder for NextAuth configuration
export const authOptions = {};

export async function GET() {
  return NextResponse.json({ message: "NextAuth GET not implemented yet." });
}

export async function POST() {
  return NextResponse.json({ message: "NextAuth POST not implemented yet." });
}
