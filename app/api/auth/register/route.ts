import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { email, username, password } = await request.json();
  console.log("REGISTER ATTEMPT:", email);

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const newUser = await prisma.user.create({
    data: {
      email,
      username,
      password,
    },
  });

  return NextResponse.json({ message: "User created", user: { id: newUser.id, email: newUser.email } });
}
