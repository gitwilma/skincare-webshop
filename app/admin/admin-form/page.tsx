"use client";
import { Box, Button, TextField } from "@mui/material";
import { Prisma } from "@prisma/client";
import { useForm } from "react-hook-form";

export default function AdminForm() {
  // const product = await db.product.findMany();
  const form = useForm<Prisma.ProductCreateInput>({
    // "resolver"
  });

  const handleSubmit = (product: Prisma.ProductCreateInput) => {};

  return (
    <Box
      component="form"
      data-cy="product-form"
      onSubmit={form.handleSubmit(handleSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        mx: "auto",
      }}
    >
      <TextField
        slotProps={{
          htmlInput: { "data-cy": "product-title" },
          formHelperText: { "data-cy": "product-title-error" } as any,
        }}
        label="Title"
        {...form.register("title")}
        error={Boolean(form.formState.errors.title)}
        helperText={form.formState.errors.title?.message}
      />
      <TextField
        slotProps={{
          htmlInput: { "data-cy": "product-description" },
          formHelperText: { "data-cy": "product-description-error" } as any,
        }}
        label="Description"
        {...form.register("description")}
        error={Boolean(form.formState.errors.description)}
        helperText={form.formState.errors.description?.message}
      />
      <TextField
        slotProps={{
          htmlInput: { "data-cy": "product-price" },
          formHelperText: { "data-cy": "product-price-error" } as any,
        }}
        label="Price"
        {...form.register("price")}
        error={Boolean(form.formState.errors.price)}
        helperText={form.formState.errors.price?.message}
      />
      <TextField
        slotProps={{
          htmlInput: { "data-cy": "product-image" },
          formHelperText: { "data-cy": "product-image-error" } as any,
        }}
        label="Image"
        {...form.register("image")}
        error={Boolean(form.formState.errors.image)}
        helperText={form.formState.errors.image?.message}
      />
      <Button type="submit" variant="contained" color="primary">
        Add Product
      </Button>
    </Box>
  );
}
