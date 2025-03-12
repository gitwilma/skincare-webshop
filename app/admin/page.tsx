"use client";
import { products } from "@/data";
import { Edit, RemoveCircleOutline } from "@mui/icons-material";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ProductCard from "../Components/product-card";

export default function AdminPage() {
  const handleEditBtn = () => {
    console.log("Edit clicked");
  };

  const handleRemoveBtn = () => {
    console.log("Remove clicked");
  };

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
              <ProductCard product={product} hideBuyButton={true}>
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
                  <Button
                    onClick={handleEditBtn}
                    color="primary"
                    sx={{ minWidth: "auto" }}
                  >
                    <Edit />
                  </Button>
                  <Button
                    onClick={handleRemoveBtn}
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
