import BuyButton from "@/app/components/buy-button";
import ProductCard from "@/app/components/product-card";
import { Box, Grid, Typography } from "@mui/material";
import { notFound } from "next/navigation";
import { db } from "../../../prisma/db";
export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await db.category.findUnique({
    where: { slug: params.slug },
    include: {
      products: true, // ✅ Hämta alla produkter som tillhör kategorin
    },
  });

  if (!category) {
    return notFound();
  }

  return (
    <Box px={2} py={4}>
    <Typography variant="h4" fontWeight={600} gutterBottom>
      {category.name} ({category.products.length} produkter)
    </Typography>

    <Grid container spacing={3}>
      {category.products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <ProductCard product={product}>
            <BuyButton product={product} />
          </ProductCard>
        </Grid>
      ))}
    </Grid>
  </Box>
  );
}
