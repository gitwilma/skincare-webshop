import { db } from '@/prisma/db';
import { NextResponse } from 'next/server';

export async function GET() {
    const products = await db.product.findMany({
        include: { categories: true },
    });

    return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();

  const { articleNumber, title, description, image, price, categoryNames } =
    body;

  try {
    // Koppla kategorier baserat på namn
    const categories = await Promise.all(
      categoryNames.map(async (name: string) => {
        return db.category.upsert({
          where: { name },
          update: {},
          create: { name },
        });
      })
    );

    // Skapa produkten och koppla kategorier
    const newProduct = await db.product.create({
      data: {
        articleNumber,
        title,
        description,
        image,
        price: parseFloat(price),
        categories: {
          connect: categories.map((cat) => ({ id: cat.id })),
        },
      },
      include: { categories: true },
    });

    return NextResponse.json(newProduct);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Något gick fel' }, { status: 500 });
  }
}
