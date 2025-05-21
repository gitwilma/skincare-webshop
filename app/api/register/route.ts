import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const user = await prisma.user.create({
    data: {
      email,
      password,
      name: email,
      emailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return NextResponse.json({ success: true, user });
};
