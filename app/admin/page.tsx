import { products } from "@/data";
import { Box, Button, Container, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ProductCard from "../Components/product-card";

export default function AdminPage() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 400,
          mx: "auto",
        }}
      >
        <TextField label="Title" />
        <TextField label="Id" />
        <TextField label="Description" />
        <Button type="submit" variant="contained" color="primary">
          Add Product
        </Button>
      </Box>
      <Container>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid size={{ xs: 6, md: 4, lg: 3 }} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
