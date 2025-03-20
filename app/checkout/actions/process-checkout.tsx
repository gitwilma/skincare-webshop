"use server";

import { CartItem } from "@/data";
import { db } from "@/prisma/db";
import { Prisma } from "@prisma/client";

export async function processCheckout(
  cart: CartItem[],
  customerData: Prisma.CustomerCreateInput
) {
  console.log("Hej");

  if (cart.length === 0) {
    throw new Error("Cart is empty");
  }

  // Spara kunden i databasen eller hitta befintlig
  const customer = await db.customer.create({
    data: customerData,
  });

  // Beräkna totalpris - hämta potentiellt från cart-provider?
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Skapa order
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

  return order.orderNumber;
}
