import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";


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
    const p = password;

    if (!u || !s || !p) {
        return NextResponse.json({ error: "ユーザー名、学生ID、パスワードは必須です" }, { status: 400 });
    }

    const exists = await prisma.user.findFirst({
        where: {
            OR: [
                { username: u },
                { studentId: s },
            ],
        },
    });

    if (exists) {
        return NextResponse.json({ error: "ユーザー名または学生IDは既に使用されています" }, { status: 409 });
    }   

    const passwordHash = await bcrypt.hash(p, 10);
    await prisma.user.create({
        data: {
            username: u,
            studentId: s,
            passwordHash,
        },
    });

    return NextResponse.json({ success: true });
}