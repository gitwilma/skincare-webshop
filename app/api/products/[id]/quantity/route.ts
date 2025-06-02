import { db } from "@/prisma/db";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();

    const { id } = params;
    const { quantity } = await req.json();

    if (!id || quantity === undefined) {
      return NextResponse.json(
        { error: "Product ID and quantity are required" },
        { status: 400 }
      );
    }

    if (quantity < 0) {
      return NextResponse.json(
        { error: "Quantity cannot be negative" },
        { status: 400 }
      );
    }

    const updatedProduct = await db.product.update({
      where: { id },
      data: { quantity },
    });

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
