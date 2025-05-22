"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import HeroSection from "./hero";
import ProductCard from "./product-card";
import BuyButton from "./buy-button";
import CategoryList from "./categoriesList";
import AllProducts from "./allProducts";


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
      <HeroSection />
      <Container maxWidth="lg">
      <CategoryList categories={categories} /> 
      <AllProducts products={products} />
      </Container>
    </QueryClientProvider>
  );
}
