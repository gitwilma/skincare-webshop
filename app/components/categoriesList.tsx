"use client";

import { db } from "@/prisma/db";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,

  Typography
} from "@mui/material";
import Link from "next/link";

export default function CategoryList({ categories }: { categories: any[] }) {
  return (
    <Box px={2} py={4}>
      <Typography variant='h5' fontWeight={600} gutterBottom>
        Kategorier
      </Typography>
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
            <Link href={`/categories/${category.slug}`} passHref>
              <Card
                sx={{
                  height: "100%",
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <CardMedia
                  component='img'
                  height='160'
                  image={category.image}
                  alt={category.name}
                />
                <CardContent>
                  <Typography variant='subtitle1' fontWeight={500}>
                    {category.name}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}