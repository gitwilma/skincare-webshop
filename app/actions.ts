"use server";

import { db } from "@/prisma/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// 🔹 Lägg till en ny produkt
export async function addNewProduct(product: Prisma.ProductCreateInput) {
  await db.product.create({ data: product });
  revalidatePath("/");
  redirect("/");
}

// 🔹 Hämta alla produkter
export async function getAllProducts() {
  return await db.product.findMany();
}

// 🔹 Hämta en enskild produkt med ID
export async function getProductById(id: string) {
  if (!id) throw new Error("Product ID is required");
  
  const product = await db.product.findUnique({ where: { id } });

  if (!product) throw new Error("Product not found");

  return product;
}

// 🔹 Uppdatera en produkt
export async function updateProduct(id: string, data: Prisma.ProductUpdateInput) {
  if (!id) throw new Error("Product ID is required");

  await db.product.update({ where: { id }, data });
  revalidatePath("/admin");
}

// 🔹 Radera en produkt
export async function deleteProduct(id: string) {
  if (!id) throw new Error("Product ID is required");

  await db.product.delete({ where: { id } });
  revalidatePath("/admin");
}
