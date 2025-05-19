import { db } from "@/prisma/db";
import HomeContent from "./components/clientHome";

export default async function Home() {
  const products = await db.product.findMany();

  return <HomeContent products={products} />;
}


// denna sidan är bara server, inget för client. clientHome är client
