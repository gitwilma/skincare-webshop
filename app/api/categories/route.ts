import { db } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await db.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    return new NextResponse("Failed to fetch categories", { status: 500 });
  }
}
