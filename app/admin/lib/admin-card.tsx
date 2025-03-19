import ProductCard from "@/app/components/product-card";
import { products } from "@/data";
import { Edit } from "@mui/icons-material";
import { Box, Button, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import DeleteBtn from "./delete-btn";

export default function AdminCard() {
  return (
    <>
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
                  <Button color="primary" sx={{ minWidth: "auto" }}>
                    <Link href={`/admin/${product.id}`}>
                      <Edit />
                    </Link>
                  </Button>
                  <DeleteBtn />
                </Box>
              </ProductCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
