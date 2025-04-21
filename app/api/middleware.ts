import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/db";

export async function middleware(req: NextRequest) {
  await connectDB();
  return NextResponse.next();
}
