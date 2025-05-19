import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { notFound } from "next/navigation";
import { db } from "../../../prisma/db";
import React from "react";
export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await db.category.findUnique({
    where: { slug: params.slug },
    include: {
      products: true, // ✅ Hämta alla produkter som tillhör kategorin
    },
  });

  if (!category) {
    return notFound();
  }

  return (
    <Box px={2} py={4}>
      <Typography variant='h4' fontWeight={600} gutterBottom>
        {category.name} ({category.products.length} produkter)
      </Typography>

      <Grid container spacing={3}>
        {category.products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              sx={{
                height: "100%",
                transition: "0.3s",
                "&:hover": { boxShadow: 6 },
              }}
            >
              <CardMedia
                component='img'
                height='160'
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography variant='subtitle1' fontWeight={600}>
                  {product.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {product.description}
                </Typography>
                <Typography variant='body1' fontWeight={500} mt={1}>
                  {product.price} kr
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
