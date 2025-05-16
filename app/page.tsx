import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import BuyButton from "./components/buy-button";
import HeroText from "./components/hero-text";
import ProductCard from "./components/product-card";
import { db } from "@/prisma/db"; // <-- Import Prisma client

export default async function Home() {
  let products = [];
  try {
    products = await db.product.findMany(); // <-- Fetch directly from Prisma
    if (!Array.isArray(products)) {
      products = [];
    }
  } catch (e) {
    console.error("Failed to fetch products", e);
    products = [];
  }
  return (
    <main>
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
    </main>
  );
}
