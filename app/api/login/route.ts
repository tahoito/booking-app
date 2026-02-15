import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { readUsers } from "@/lib/users-store";
import { setLogin } from "@/lib/auth";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (typeof username !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const u = username.trim();
  const p = password;

  const users = await readUsers();
  const user = users.find((u) => u.studentId === username);

  if (!user) {
    return NextResponse.json({ error: "ユーザー名またはパスワードが違います" }, { status: 401 });
  }

  const ok = await bcrypt.compare(p, user.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: "ユーザー名またはパスワードが違います" }, { status: 401 });
  }

  setLogin(user.id);

  return NextResponse.json({ success: true });
}
