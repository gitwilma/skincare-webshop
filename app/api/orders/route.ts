import { db } from "@/prisma/db";
import { NextResponse } from "next/server";

type CartItem = {
  id: string;
  articleNumber: string;
  image: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
};

export async function POST(req: Request) {
  const body = await req.json();
  const cart: CartItem[] = body.cart;
  const customerData = body.customer;

  if (!cart || cart.length === 0 || !customerData) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const customer = await db.customer.create({ data: customerData });

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = await db.order.create({
    data: {
      customerId: customer.id,
      totalPrice,
      orderRows: {
        create: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  });

  for (const item of cart) {
    await db.product.update({
      where: { id: item.id },
      data: { quantity: { decrement: item.quantity } },
    });
  }

  return NextResponse.json({ orderNumber: order.orderNumber });
}
