"use client";

import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { BorderBottom } from "@mui/icons-material";

export default function CategoryList({ categories }: { categories: any[] }) {
  return (
    <Box px={2} py={4}         sx={{maxWidth: "lg", width: "100%", mx: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}
>
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{ fontFamily: "monospace", mb: 3 }}
      >
        Kategorier
      </Typography>

      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
            <Link
              href={`/categories/${category.slug}`}
              passHref
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                  height: 80,
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    position: "relative",
                    flexShrink: 0,
                    mr: 2,
                  }}
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    fontSize: 16,
                    borderBottom: "2px solid black",
                  }}
                >
                  {category.name}
                </Typography>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
