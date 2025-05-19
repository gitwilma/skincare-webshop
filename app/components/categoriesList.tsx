"use client";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  
  Typography,
} from "@mui/material";
import { Category } from "@prisma/client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Kunde inte hämta kategorier:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' mt={4}>
        <CircularProgress />
      </Box>
    );
  }

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
