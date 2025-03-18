"use server";

import { CartItem } from "@/data";
import { db } from "@/prisma/db";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export async function processCheckout(
  cart: CartItem[],
  customer: Prisma.CustomerCreateInput
) {
  db.order.create({ data: {
    ""
  }})

  if (paymentSuccess) {
    redirect("/confirmation/bekraftelse");
  } else {
    throw new Error("Payment failed. Try again");
  }
}
