import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export async function POST(request: Request) {

  const { email, password } = await request.json();

  // Trim and validate
  if (!email || !email.trim()) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }
  if (!password || password.length < 4) {
    return NextResponse.json({ error: "Password must be at least 4 characters" }, { status: 400 });
  }

 

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword, 
    },
  });

  return NextResponse.json({
    message: "User created",
    user: { id: newUser.id, email: newUser.email },
  });
}


