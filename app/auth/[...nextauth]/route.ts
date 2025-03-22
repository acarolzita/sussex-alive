// frontend/app/auth/[...nextauth]/route.ts
import { NextResponse } from "next/server";

// Export a dummy authOptions as any to bypass strict type-checking
export const authOptions: any = {};

export async function GET() {
  return NextResponse.json({ message: "NextAuth GET not implemented yet." });
}

export async function POST() {
  return NextResponse.json({ message: "NextAuth POST not implemented yet." });
}
