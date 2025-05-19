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
      name: "Fruktig",
      slug: "fruktig",
      image: "/images/categories/fruktig.jpg",
    },
    {
      name: "Ingefära",
      slug: "ingefara",
      image: "/images/categories/ginger.jpg",
    },
    {
      name: "Klassisk",
      slug: "klassisk",
      image: "/images/categories/klassisk.jpg",
    },
    {
      name: "Koffeinfri",
      slug: "koffeinfri",
      image: "/images/categories/decaf.jpg",
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
    where: { articleNumber: "K001" },
    update: {},
    create: {
      articleNumber: "K001",
      title: "Kombucha Mango Passion",
      description: "Fruktig kombucha med smak av mango och passionsfrukt.",
      image: "/images/roots/blueberry.png",
      price: 35,
      categories: {
        connect: [{ slug: "fruktig" }],
      },
    },
  });
  
  await db.product.upsert({
    where: { articleNumber: "K002" },
    update: {},
    create: {
      articleNumber: "K002",
      title: "Kombucha Ingefära Citron",
      description: "Frisk kombucha med syrlig citron och kryddig ingefära.",
      image: "/images/roots/ginger.png",
      price: 36,
      categories: {
        connect: [{ slug: "ingefara" }],
      },
    },
  });
  
  await db.product.upsert({
    where: { articleNumber: "K003" },
    update: {},
    create: {
      articleNumber: "K003",
      title: "Klassisk Kombucha",
      description: "Originalsmak - fermenterat te som det ska smaka.",
      image: "/images/roots/currant.png",
      price: 32,
      categories: {
        connect: [{ slug: "klassisk" }],
      },
    },
  });
  
  await db.product.upsert({
    where: { articleNumber: "K004" },
    update: {},
    create: {
      articleNumber: "K004",
      title: "Koffeinfri Hallon Kombucha",
      description: "Bärig kombucha utan koffein.",
      image: "/images/roots/honey.png",
      price: 34,
      categories: {
        connect: [{ slug: "koffeinfri" }, { slug: "fruktig" }],
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

  