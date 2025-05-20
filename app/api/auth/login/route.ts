import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { email, password } = await request.json();
  console.log("Login attempt:", email, password); // Debug

  const user = await prisma.user.findUnique({ where: { email } });
  console.log("Found user:", user); // Debug

  if (!user || user.password !== password) {
    console.log("Invalid credentials");
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  console.log("Login successful");

  const response = NextResponse.json({ message: "Login successful" });

  response.cookies.set("authToken", String(user.id), {
    path: "/" ,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  console.log(response.cookies.get("authToken")); // Debug
  return response;
}
