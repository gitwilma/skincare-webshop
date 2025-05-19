import { db } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const product = await req.json();
  console.log("Product data:", product);
  await db.product.create({ data: product });
  return NextResponse.redirect(new URL("/admin", req.url));
}
