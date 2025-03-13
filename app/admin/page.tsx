import { products } from "@/data";
import { Edit, RemoveCircleOutline } from "@mui/icons-material";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ProductCard from "../components/product-card";

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
        <TextField label="Description" />
        <TextField label="Price" />
        <TextField label="Image" />
        <Button type="submit" variant="contained" color="primary">
          Add Product
        </Button>
        <Typography>Manage products</Typography>
      </Box>
      <Container>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid size={{ xs: 6, md: 4, lg: 3 }} key={product.id}>
              <ProductCard product={product}>
                <Box
                  sx={{
                    gap: 0.5,
                    mt: 2,
                    minWidth: "auto",
                    padding: "1px",
                    display: "inline-flex",
                    type: "submit",
                    color: "primary",
                  }}
                >
                  <Button /* Länk till `/admin/products/${product.id}` */
                    // onClick={handleEditBtn(product.id)}
                    color="primary"
                    sx={{ minWidth: "auto" }}
                  >
                    <Edit />
                  </Button>
                  <Button /* DeleteProductButton "use client" --> visa dialog innan borttagning */
                    // onClick={handleRemoveBtn(product.id)}
                    color="primary"
                    sx={{ minWidth: "auto" }}
                  >
                    <RemoveCircleOutline />
                  </Button>
                </Box>
              </ProductCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
