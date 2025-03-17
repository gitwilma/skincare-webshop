"use server";

import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addNewProduct(formData: FormData) {
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const price = Number(formData.get("price"));
  const image = formData.get("image")?.toString();

  if (!title || !description || isNaN(price) || !image) throw new Error("400");

  await db.product.create({ data: { title, description, price, image } });
  revalidatePath("/");
  redirect("/");
}

//export async function deletePost(id: number) {
//   await db.product.delete({ where: { id: id } });
//   revalidatePath("/");
// }
