import { products } from "@/data";
import { db } from "./db";

async function main() {
  for (const { id, ...product } of products) {
    await db.product.upsert({
      where: { articleNumber: product.articleNumber },
      update: {},
      create: product,
    });
  }

  const electronics = await db.category.upsert({
    where: { slug: "electronics" },
    update: {},
    create: {
      name: "Electronics",
      slug: "electronics",
      image: "/images/categories/electronics.jpg",
    },
  });

  const fashion = await db.category.upsert({
    where: { slug: "fashion" },
    update: {},
    create: {
      name: "Fashion",
      slug: "fashion",
      image: "/images/categories/fashion.jpg",
    },
  });

  // Lägg till produkt + koppling till kategorier
  await db.product.upsert({
    where: { articleNumber: "prod-001" },
    update: {},
    create: {
      articleNumber: "prod-001",
      title: "Smartphone",
      description: "Latest model",
      image: "/images/products/phone.jpg",
      price: 999,
      categories: {
        connect: [{ slug: "electronics" }],
      },
    },
  });

  await db.product.upsert({
    where: { articleNumber: "prod-002" },
    update: {},
    create: {
      articleNumber: "prod-002",
      title: "Smartwatch",
      description: "Wearable tech",
      image: "/images/products/watch.jpg",
      price: 199,
      categories: {
        connect: [{ slug: "electronics" }, { slug: "fashion" }],
      },
    },
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
