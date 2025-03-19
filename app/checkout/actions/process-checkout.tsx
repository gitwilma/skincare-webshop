"use server";

import { CartItem } from "@/data";
import { db } from "@/prisma/db";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export async function processCheckout(
  cart: CartItem[],
  customerData: Prisma.CustomerCreateInput
) {
  console.log("Hej");

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

    console.log("🔹 Attempting payment processing...");

    const paymentSuccess = true;

    if (paymentSuccess) {
      console.log("Redirecting to confirmation page...");

      return redirect("/confirmation/bekraftelse");
    } else {
      throw new Error("Payment failed. Try again");
    }
  } catch (error) {
    console.error("Checkout error:", error);

    // Undvik att kasta ett fel om det är en redirect
    if ((error as any)?.digest === "NEXT_REDIRECT") {
      return;
    }
    if (error instanceof Error) {
      throw new Error(
        "Something went wrong with checkout. Error details: " + error.message
      );
    } else {
      throw new Error(
        "Something went wrong with checkout. Unknown error occurred."
      );
    }
  }
}
