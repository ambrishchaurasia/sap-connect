// Example route file
// /app/api/users/route.ts

import { connectDB } from "@/config/db";
import User from "@/models/User";

export async function GET() {
  await connectDB(); // 👈 Still call it here to be safe for SSR
  const users = await User.find();
  return Response.json(users);
}
