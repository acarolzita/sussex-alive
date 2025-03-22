// app/auth/[...nextauth]/route.ts
import { NextResponse } from "next/server";

// Dummy NextAuth configuration placeholder.
// This export allows your messages API to import authOptions.
export const authOptions = {};

// Dummy GET handler for authentication routes.
export async function GET() {
  return NextResponse.json({ message: "NextAuth GET not implemented yet." });
}

// Dummy POST handler for authentication routes.
export async function POST() {
  return NextResponse.json({ message: "NextAuth POST not implemented yet." });
}
