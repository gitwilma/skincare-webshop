"use server";

import { CartItem } from "@/data";
import { db } from "@/prisma/db";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export async function processCheckout(
  cart: CartItem[],
  customerData: Prisma.CustomerCreateInput
) {
  if (cart.length === 0) {
    throw new Error("Cart is empty");
  }

  try {
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

    // Simulera betalningsprocess (här kan du lägga in betalningslogik)
    const paymentSuccess = true; // Uppdatera detta med faktisk betalningslogik

    if (paymentSuccess) {
      redirect("/confirmation/bekraftelse");
    } else {
      throw new Error("Payment failed. Try again");
    }
  } catch (error) {
    console.error("Checkout error:", error);
    throw new Error("Something went wrong with checkout.");
  }
}
