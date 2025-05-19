// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { db } from './db';

const prisma = new PrismaClient();

async function main() {
  // Skapa kategorier
  const beer = await db.category.upsert({
    where: { name: 'Beer' },
    update: {},
    create: { name: 'Beer' },
  });

  const cider = await db.category.upsert({
    where: { name: 'Cider' },
    update: {},
    create: { name: 'Cider' },
  });

  // Skapa produkter och koppla till kategorier
  await db.product.upsert({
    where: { articleNumber: 'prod-001' },
    update: {},
    create: {
      articleNumber: 'prod-001',
      title: 'Lager 5%',
      description: 'En fräsch lager med fin beska.',
      image: '/lager.png',
      price: 19.9,
      categories: {
        connect: [{ id: beer.id }],
      },
    },
  });

  await db.product.upsert({
    where: { articleNumber: 'prod-002' },
    update: {},
    create: {
      articleNumber: 'prod-002',
      title: 'Äppelcider',
      description: 'Söt äppelcider med frisk smak.',
      image: '/cider.png',
      price: 21.5,
      categories: {
        connect: [{ id: cider.id }, { id: beer.id }],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
