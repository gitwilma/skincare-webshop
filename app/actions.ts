"use server";

import { db } from "@/prisma/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addNewProduct(product: Prisma.ProductCreateInput) {
  await db.product.create({ data: product });
  revalidatePath("/");
  redirect("/");
}

//export async function deletePost(id: number) {
//   await db.product.delete({ where: { id: id } });
//   revalidatePath("/");
// }
