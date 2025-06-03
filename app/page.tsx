import { db } from "@/prisma/db";
import HomeContent from "./components/clientHome";

export default async function Home() {
  const products = await db.product.findMany({'orderBy': { 'id': 'desc' }});
  const categories = await db.category.findMany();


  return <HomeContent products={products} categories={categories}/>;
}

