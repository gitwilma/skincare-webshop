import { db } from "@/prisma/db";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";

export async function POST(req: Request) {
  try {
    await requireAdmin();

    const body = await req.json();
    const {
      title,
      description,
      price,
      image,
      quantity,
      categories,
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
    if (error instanceof Response) return error;
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
