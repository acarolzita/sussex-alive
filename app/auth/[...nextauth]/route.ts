// @ts-nocheck
import { NextResponse } from "next/server";

// Dummy NextAuth configuration placeholder.
// Export authOptions as any to bypass type-checking.
export const authOptions: any = {};

export async function GET() {
  return NextResponse.json({ message: "NextAuth GET not implemented yet." });
}

export async function POST() {
  return NextResponse.json({ message: "NextAuth POST not implemented yet." });
}
