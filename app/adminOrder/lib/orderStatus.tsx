"use server";

import { auth } from "@/auth";
import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function updateOrderStatus(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  if (!user || !user.isAdmin) return;

  const orderId = formData.get("orderId") as string;
  const status = formData.get("status") as string;
  if (!orderId || !status) return;

  await db.order.update({
    where: { id: orderId },
    data: { status: status as any },
  });

  revalidatePath("/adminOrder");
  redirect("/adminOrder");
}

export async function deleteOrder(formData: FormData) {
    console.log("deleteOrder called");
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  if (!user || !user.isAdmin) return;

  const orderId = formData.get("orderId") as string;
  if (!orderId) return;

  await db.order.delete({ where: { id: orderId } });


  revalidatePath("/adminOrder");
  redirect("/adminOrder");
}
