import { products } from "@/data";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import ProductCard from "./components/product-card";

export default function Home() {
  return (
    <main>
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
