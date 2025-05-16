import ProductCard from "@/app/components/product-card";
import { Edit } from "@mui/icons-material";
import { Box, Button, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import DeleteBtn from "./delete-btn";
import { db } from "@/prisma/db";

export default async function AdminCard() {
  const products = await db.product.findMany();

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid size={{ xs: 6, md: 4 }} key={product.id}>
              <ProductCard product={product}>
                <Box
                  sx={{
                    gap: 0.5,
                    mt: 2,
                    minWidth: "auto",
                    padding: "1px",
                    display: "inline-flex",
                    type: "submit",
                    color: "primary.main",
                  }}
                >
                  <Button color="primary" sx={{ minWidth: "auto" }}>
                    <Link href={`/admin/product/${product.articleNumber}`}>
                      <Edit color="primary" data-cy="admin-edit-product" />
                    </Link>
                  </Button>
                  <DeleteBtn productId={product.articleNumber} />
                </Box>
              </ProductCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
