import { products } from "@/data";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import ProductCard from "./components/product-card";

export default function Home() {
  return (
    <main>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 400,
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
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid size={{ xs: 6 }} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
