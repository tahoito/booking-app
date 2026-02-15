import { NextResponse } from "next/server";
import { readUsers } from "@/lib/users-store";
import { getLoginUserId } from "@/lib/auth";

export async function GET() {
  const uid = getLoginUserId();
  if (!uid) return NextResponse.json({ user: null });

  const users = await readUsers();
  const user = users.find((u) => u.id === uid);

  if (!user) return NextResponse.json({ user: null });

  return NextResponse.json({
    user: { id: user.id, username: user.username, studentId: user.studentId },
  });
}
