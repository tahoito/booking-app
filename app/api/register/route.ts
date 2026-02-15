import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { readUsers, writeUsers } from "@/lib/users-store";

export async function POST(request: Request) {
  const { username, studentId, password } = await request.json();

  if (
    typeof username !== "string" || 
    typeof studentId !== "string" ||
    typeof password !== "string" 
) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const u = username.trim();
  const s = studentId.trim();
  const p = password.trim();

  if (!u || !s || !p) {
    return NextResponse.json({ error: "ユーザー名、学生ID、パスワードは必須です" }, { status: 400 });
  }

  const users = await readUsers();
  const existingUser = users.find((u) => u.username === username);

  if (existingUser) {
    return NextResponse.json({ error: "ユーザー名は既に使われています" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = { 
    id: crypto.randomUUID(), 
    username: u,
    studentId: s,
    passwordHash, 
};

  users.push(newUser);
  await writeUsers(users);

  return NextResponse.json({ success: true });
}