import { db } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { articleNumber } = await req.json();
  if (!articleNumber)
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );

  await db.product.delete({ where: { articleNumber } });
  return NextResponse.json({ success: true });
}
