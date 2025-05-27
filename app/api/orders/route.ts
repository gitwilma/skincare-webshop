import { auth } from "@/auth";
import { db } from "@/prisma/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

type CartItem = {
  id: string;
  price: number;
  quantity: number;
};

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { cart, address } = await req.json();
    if (!cart?.length || !address) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

    const addressRow = await db.address.create({ data: address });
    const totalPrice = cart.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

    const order = await db.order.create({
      data: {
        customerId: user.id,
        shippingAddressId: addressRow.id,
        totalPrice,
        orderRows: {
          create: cart.map((item: CartItem) => ({
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
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const url = new URL(req.url);
    const isAdmin = url.searchParams.get("admin") === "1" && user.isAdmin;

    const orders = await db.order.findMany({
      ...(isAdmin ? {} : { where: { customerId: user.id } }),
      orderBy: { createdAt: "desc" },
      include: {
        orderRows: { include: { product: true } },
        shippingAddress: true,
        customer: true,
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    if (!user.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { orderId, status } = await req.json();
    if (!orderId || !status) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

    const order = await db.order.update({ where: { id: orderId }, data: { status } });
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
