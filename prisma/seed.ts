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

  const categories = [
    {
      name: "Läsk",
      slug: "lask",
      image: "/images/categories/lask.jpg",
    },
    {
      name: "Juice",
      slug: "juice",
      image: "/images/categories/juice.jpg",
    },
    {
      name: "Vatten",
      slug: "vatten",
      image: "/images/categories/vatten.jpg",
    },
    {
      name: "Energidryck",
      slug: "energidryck",
      image: "/images/categories/energidryck.jpg",
    },
    {
      name: "Kaffe",
      slug: "kaffe",
      image: "/images/categories/kaffe.jpg",
    },
    {
      name: "Te",
      slug: "te",
      image: "/images/categories/te.jpg",
    },
  ];

  for (const category of categories) {
    await db.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }


  await db.product.upsert({
    where: { articleNumber: "prod-003" },
    update: {},
    create: {
      articleNumber: "prod-003",
      title: "Cola Zero",
      description: "Sockerfri läsk",
      image: "/images/products/cola-zero.jpg",
      price: 15,
      categories: {
        connect: [{ slug: "lask" }],
      },
    },
  });

  await db.product.upsert({
    where: { articleNumber: "prod-004" },
    update: {},
    create: {
      articleNumber: "prod-004",
      title: "Apelsinjuice",
      description: "Fräsch apelsinjuice",
      image: "/images/products/apelsinjuice.jpg",
      price: 20,
      categories: {
        connect: [{ slug: "juice" }],
      },
    },
  });

  await db.product.upsert({
    where: { articleNumber: "prod-005" },
    update: {},
    create: {
      articleNumber: "prod-005",
      title: "Kolsyrat vatten",
      description: "Kallt mineralvatten med bubblor",
      image: "/images/products/sparkling-water.jpg",
      price: 10,
      categories: {
        connect: [{ slug: "vatten" }],
      },
    },
  });

  await db.product.upsert({
    where: { articleNumber: "prod-006" },
    update: {},
    create: {
      articleNumber: "prod-006",
      title: "Monster Energy",
      description: "Energi för hela dagen",
      image: "/images/products/monster.jpg",
      price: 25,
      categories: {
        connect: [{ slug: "energidryck" }],
      },
    },
  });

  await db.product.upsert({
    where: { articleNumber: "prod-007" },
    update: {},
    create: {
      articleNumber: "prod-007",
      title: "Iskaffe",
      description: "Kallbryggt kaffe för varma dagar",
      image: "/images/products/iced-coffee.jpg",
      price: 30,
      categories: {
        connect: [{ slug: "kaffe" }],
      },
    },
  });

  await db.product.upsert({
    where: { articleNumber: "prod-008" },
    update: {},
    create: {
      articleNumber: "prod-008",
      title: "Grönt Te",
      description: "Naturligt och hälsosamt",
      image: "/images/products/green-tea.jpg",
      price: 18,
      categories: {
        connect: [{ slug: "te" }],
      },
    },
  });

  await db.product.upsert({
    where: { articleNumber: "prod-009" },
    update: {},
    create: {
      articleNumber: "prod-009",
      title: "Röd Juice",
      description: "Mix av hallon och jordgubb",
      image: "/images/products/red-juice.jpg",
      price: 22,
      categories: {
        connect: [{ slug: "juice" }, { slug: "lask" }], 
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
