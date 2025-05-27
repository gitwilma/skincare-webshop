import { db } from "@/prisma/db";
import ClientProductView from "./ClientProductView";

interface Props {
  params: Promise<{ articleNumber: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { articleNumber } = await params;
  const item = await db.product.findUnique({ where: { articleNumber } });

  if (!item) return <h2>404: Produkten hittades inte</h2>;

  return <ClientProductView item={item} />;
}
