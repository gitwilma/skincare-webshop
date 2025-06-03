import { db } from '@/prisma/db';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { quantity } = await req.json();

  if (!id || quantity === undefined) {
    return NextResponse.json(
      { error: 'Product ID and quantity are required' },
      { status: 400 }
    );
  }

  if (quantity < 0) {
    return NextResponse.json(
      { error: 'Quantity cannot be negative' },
      { status: 400 }
    );
  }

  const updatedProduct = await db.product.update({
    where: { id },
    data: { quantity },
  });

  return NextResponse.json({ success: true, product: updatedProduct });
}
