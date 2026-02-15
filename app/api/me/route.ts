import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getLoginUserId } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  const uid = await getLoginUserId();
  if (!uid) return NextResponse.json({ user: null });

  const user = await prisma.user.findUnique({
    where: { id: uid },
    select: { id: true, username: true, studentId: true },
  });

  return NextResponse.json({ user: user ?? null });
}
