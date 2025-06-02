import { db } from "@/prisma/db";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id)
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );

  const product = await db.product.findUnique({ where: { id } });
  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  return NextResponse.json(product);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();

    const { id } = params;
    const data = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    await db.product.update({ where: { id }, data });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await requireAdmin();

    const { articleNumber } = await req.json();
    if (!articleNumber)
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );

    await db.product.delete({ where: { articleNumber } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
