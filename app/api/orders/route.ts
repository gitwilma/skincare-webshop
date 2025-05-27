import { auth } from "@/auth";
import { db } from "@/prisma/db";
import { headers } from "next/headers";
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
  try {
    const session = await auth.api.getSession({
      headers: await headers(), // some endpoint might require headers
    });

    const user = session?.user;
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    console.log("Session user:", user);

    const body = await req.json();
    const cart: CartItem[] = body.cart;
    const addressData = body.address;

    if (!cart || cart.length === 0 || !addressData) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const address = await db.address.create({ data: addressData });

    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await db.order.create({
      data: {
        customerId: user.id,
        shippingAddressId: address.id,
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
  } catch (error) {
    console.error("Order API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
  const session = await auth.api.getSession({
      headers: await headers(), // some endpoint might require headers
    });

    const user = session?.user;
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const orders = await db.order.findMany({
      where: { customerId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        orderRows: { include: { product: true } },
        shippingAddress: true,
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
