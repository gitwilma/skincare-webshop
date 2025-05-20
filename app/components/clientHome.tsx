"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import { useState } from "react";
import HeroText from "./hero-text";
import ProductCard from "./product-card";
import BuyButton from "./buy-button";
import CategoryList from "./categoriesList";

export default function ClientHomeContent({
  products,
  categories,
}: {
  products: any[];
  categories: any[];
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 400, lg: 300 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          overflow: "hidden",
          "@media (max-width: 1280px)": {
            height: 300,
          },
        }}
      >
        <Image
          src="https://www.pharmaciepolygone.com/media/cache/original/01/ba/4c462d8f8f67d017ccab9e6942e5.jpg"
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
        />
      </Box>

      <HeroText />
      <CategoryList categories={categories} /> 

      <Container>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid size={{ xs: 6, md: 4 }} key={product.id}>
              <ProductCard product={product}>
                <BuyButton product={product} />
              </ProductCard>
            </Grid>
          ))}
        </Grid>
        </Container>
    </QueryClientProvider>
  );
}
