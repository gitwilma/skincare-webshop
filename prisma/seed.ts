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
   
  ];

  for (const category of categories) {
    await db.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }


  await db.product.upsert({
    where: { articleNumber: "001" },
    update: {},
    create: {
      articleNumber: "001",
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
    where: { articleNumber: "889" },
    update: {},
    create: {
      articleNumber: "889",
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
    where: { articleNumber: "99888" },
    update: {},
    create: {
      articleNumber: "99888",
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
    where: { articleNumber: "p99888" },
    update: {},
    create: {
      articleNumber: "p99888",
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
    where: { articleNumber: "89000" },
    update: {},
    create: {
      articleNumber: "89000",
      title: "Iskaffe",
      description: "Kallbryggt kaffe för varma dagar",
      image: "/images/products/iced-coffee.jpg",
      price: 30,
      categories: {
        connect: [{ slug: "vatten" }],
      },
    },
  });

  await db.product.upsert({
    where: { articleNumber: "996667" },
    update: {},
    create: {
      articleNumber: "996667",
      title: "Grönt Te",
      description: "Naturligt och hälsosamt",
      image: "/images/products/green-tea.jpg",
      price: 18,
      categories: {
        connect: [{ slug: "lask" }],
      },
    },
  });

  await db.product.upsert({
    where: { articleNumber: "00888" },
    update: {},
    create: {
      articleNumber: "00888",
      title: "Röd Juice",
      description: "Mix av hallon och jordgubb",
      image: "/images/products/red-juice.jpg",
      price: 22,
      categories: {
        connect: [{ slug: "juice" }, { slug: "lask" }], 
      },
    },
  });

  await db.product.upsert({
    where: { articleNumber: "77889" },
    update: {},
    create: {
      articleNumber: "77889",
      title: "Kolsyrat Mineralvatten",
      description: "Friskt och bubblande mineralvatten",
      image: "/images/products/sparkling-water.jpg",
      price: 12,
      categories: {
        connect: [{ slug: "vatten" }],
      },
    },
  });
  await db.product.upsert({
    where: { articleNumber: "00889" },
    update: {},
    create: {
      articleNumber: "00889",
      title: "Kolsyrat Mineralvatten",
      description: "Friskt och bubblande mineralvatten",
      image: "/images/products/sparkling-water.jpg",
      price: 12,
      categories: {
        connect: [{ slug: "juice" }],
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

  