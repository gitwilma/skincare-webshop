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

// 🔹 Hämta alla produkter
export async function getAllProducts() {
  return await db.product.findMany();
}

// 🔹 Hämta en enskild produkt
export async function getProductById(id: string) {
  return await db.product.findUnique({ where: { id } });
}

// 🔹 Uppdatera en produkt
export async function updateProduct(
  id: string,
  data: Prisma.ProductUpdateInput
) {
  await db.product.update({ where: { id }, data });
  revalidatePath("/admin");
}

// 🔹 Radera en produkt
export async function deleteProduct(id: string) {
  await db.product.delete({ where: { id } });
  revalidatePath("/admin");
}

//export async function deletePost(id: number) {
//   await db.product.delete({ where: { id: id } });
//   revalidatePath("/");
// }
