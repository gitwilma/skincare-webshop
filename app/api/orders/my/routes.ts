// app/api/orders/my/route.ts
import { authOptions } from '@/lib/auth';
import { db } from '@/prisma/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const orders = await db.order.findMany({
    where: { addressId: user.id },
    include: {
      orderRows: {
        include: {
          product: true,
        },
      },
      shippingAddress: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(orders);
}
