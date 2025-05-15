import { db } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) { // körs när en kund skickar in sin order från checkout-formuläret
  const body = await req.json();

  const { cart, customer } = body;

  if (!cart || cart.length === 0 || !customer) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const createdCustomer = await db.customer.create({ // när auth finns: använd session-info istället för att skapa customer direkt
    data: customer,
  });

  const totalPrice = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  const order = await db.order.create({
    data: {
      customerId: createdCustomer.id,
      totalPrice,
      orderRows: {
        create: cart.map((item: any) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  });

  return NextResponse.json({ orderNumber: order.orderNumber });
}

export async function GET() {
  const orders = await db.order.findMany({ // när auth finns: lägg till det här senare för att bara visa orders för admin
    include: {
      customer: true,
      orderRows: true,
    },
  });

  return NextResponse.json(orders);
}
