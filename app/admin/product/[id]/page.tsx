import { db } from "@/prisma/db";
import { Box } from "@mui/material";
import ProductForm from "../product-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminEditProductPage({ params }: Props) {
  // const searchParams = useSearchParams();
  const { id: articleNumber } = await params; // Hämta ID från URL
  const product = await db.product.findUnique({ where: { articleNumber } });

  if (!product) {
    return <p>404</p>;
  }

  return (
    <Box component="main">
      <ProductForm product={product} />
    </Box>
  );
}
