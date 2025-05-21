import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const cookieStore = cookies();
  const authToken = (await cookieStore).get('authToken')?.value;

  if (!authToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(authToken) },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }


  return NextResponse.json({ id: user.id, email: user.email, isAdmin: user.isAdmin });

}
