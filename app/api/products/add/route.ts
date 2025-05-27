// app/api/products/add/route.ts
import { db } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      description,
      price,
      image,
      quantity,
      categories, // detta ska vara { connect: [...] }
    } = body;

    const product = await db.product.create({
      data: {
        title,
        description,
        price,
        image,
        quantity,
        categories,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error in /api/products/add:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}