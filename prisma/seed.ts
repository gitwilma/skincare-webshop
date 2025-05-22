import { db } from "./db";

async function main() {
  const categories = [
    {
      name: "Fruktig",
      slug: "fruktig",
      image: "/categories/apple.png",
    },
    {
      name: "Blommig",
      slug: "blommig",
      image: "/categories/flower.png",
    },
    {
      name: "Het",
      slug: "het",
      image: "/categories/chili.png",
    },
    {
      name: "Bärig",
      slug: "berry",
      image: "/categories/berry.png",
    },
    {
      name: "Örter",
      slug: "orter",
      image: "/categories/herb.png",
    },
    {
      name: "Citrus",
      slug: "citrus",
      image: "/categories/lemon.png",
    },
    {
      name: "Ingefära",
      slug: "ingefara",
      image: "/categories/ginger.png",
    },
    {
      name: "Fisk",
      slug: "fisk",
      image: "/categories/fish.png",
    },
  ];

  for (const category of categories) {
    await db.category.upsert({
      where: { slug: category.slug },
      update: category,
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
      image: "/roots/blueberry.png",
      price: 35,
      quantity: 25,
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
      image: "/roots/ginger.png",
      price: 36,
      quantity: 40,
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
      image: "/roots/currant.png",
      price: 32,
      quantity: 30,
      categories: {
        connect: [{ slug: "het" }],
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
      image: "/roots/honey.png",
      price: 34,
      quantity: 50,
      categories: {
        connect: [{ slug: "berry" }, { slug: "fruktig" }],
      },
    },
  });

  await db.product.upsert({
    where: { articleNumber: "K005" },
    update: {},
    create: {
      articleNumber: "K005",
      title: "Blåbär & Lavendel",
      description: "Lugnande och fruktig smak av blåbär och lavendel.",
      image: "/roots/blueberry.png",
      price: 38,
      quantity: 20,
      categories: {
        connect: [{ slug: "fruktig" }],
      },
    },
  });

  await db.product.upsert({
    where: { articleNumber: "K006" },
    update: {},
    create: {
      articleNumber: "K006",
      title: "Kombucha Chili Lime",
      description: "Het och syrlig smak för den modige.",
      image: "/roots/lingon.png",
      price: 37,
      quantity: 18,
      categories: {
        connect: [{ slug: "het" }],
      },
    },
  });

  await db.product.upsert({
    where: { articleNumber: "K007" },
    update: {},
    create: {
      articleNumber: "K007",
      title: "Kombucha Granatäpple",
      description: "Söt och syrlig kombucha med granatäpple.",
      image: "/roots/turmeric.png",
      price: 35,
      quantity: 27,
      categories: {
        connect: [{ slug: "fruktig" }],
      },
    },
  });

  await db.product.upsert({
    where: { articleNumber: "K008" },
    update: {},
    create: {
      articleNumber: "K008",
      title: "Kombucha Äpple Kanel",
      description: "Smak av svensk höst i varje klunk.",
      image: "/random/5.png",
      price: 36,
      quantity: 32,
      categories: {
        connect: [{ slug: "fisk" }],
      },
    },
  });

  await db.product.upsert({
    where: { articleNumber: "K009" },
    update: {},
    create: {
      articleNumber: "K009",
      title: "Jasmin Grönt Te Kombucha",
      description: "Elegant smak med blommiga toner.",
      image: "/random/4.png",
      price: 37,
      quantity: 15,
      categories: {
        connect: [{ slug: "het" }],
      },
    },
  });

  await db.product.upsert({
    where: { articleNumber: "K010" },
    update: {},
    create: {
      articleNumber: "K010",
      title: "Citron Verbena Kombucha",
      description: "Fräschör från citronverbena och lätt syrlighet.",
      image: "/random/3.png",
      price: 36,
      quantity: 22,
      categories: {
        connect: [{ slug: "fruktig" }],
      },
    },
  });

  await db.product.upsert({
    where: { articleNumber: "K011" },
    update: {},
    create: {
      articleNumber: "K011",
      title: "Vanilj & Apelsin Kombucha",
      description: "Sötma från vanilj med frisk citrus.",
      image: "/random/2.png",
      price: 39,
      quantity: 16,
      categories: {
        connect: [{ slug: "fruktig" }],
      },
    },
  });

  await db.product.upsert({
    where: { articleNumber: "K012" },
    update: {},
    create: {
      articleNumber: "K012",
      title: "Matcha Kombucha",
      description: "Japansk matcha kombinerat med fermenterat te.",
      image: "/random/1.png",
      price: 40,
      quantity: 10,
      categories: {
        connect: [{ slug: "het" }],
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
