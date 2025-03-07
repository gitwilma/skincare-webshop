import { products } from "@/data";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ProductCard from "./components/product-card";

export default function Home() {
  return (
    <main>
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>
      </Container>
    </main>
  );
}
