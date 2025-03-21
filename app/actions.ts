"use server";

import { db } from "@/prisma/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addNewProduct(product: Prisma.ProductCreateInput) {
  await db.product.create({ data: product });
  revalidatePath("/");
  redirect("/admin");
}

export async function getAllProducts() {
  return await db.product.findMany();
}

export async function getProductById(id: string) {
  if (!id) throw new Error("Product ID is required");
  
  const product = await db.product.findUnique({ where: { id } });

  if (!product) throw new Error("Product not found");

  return product;
}

export async function updateProduct(id: string, data: Prisma.ProductUpdateInput) {
  if (!id) throw new Error("Product ID is required");

  await db.product.update({ where: { id }, data });
  revalidatePath("/admin");
}

export async function deleteProduct(articleNumber: string) {
  if (!articleNumber) throw new Error("Product ID is required");

  await db.product.delete({ where: { articleNumber } });
  revalidatePath("/admin");
}
