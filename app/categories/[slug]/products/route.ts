// /app/api/categories/[slug]/products/route.ts

import { db } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    const category = await db.category.findUnique({
      where: { slug },
      include: {
        products: true,
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category.products);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
