import { NextResponse } from "next/server";

// Export authOptions explicitly as any to bypass strict type checks.
export const authOptions: any = {};

export async function GET() {
  return NextResponse.json({ message: "NextAuth GET not implemented yet." });
}

export async function POST() {
  return NextResponse.json({ message: "NextAuth POST not implemented yet." });
}
