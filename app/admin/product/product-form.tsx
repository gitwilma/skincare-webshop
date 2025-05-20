"use client";

import { Product } from "@/prisma-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";
import { Prisma } from "@prisma/client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive("Price must be a positive number"),
  image: z.string().url("Image must be a valid URL"),
  quantity: z.coerce.number().int().min(0, "Quantity must be 0 or more"),
});

interface Props {
  product: Product;
}

export default function ProductForm({ product }: Props) {
  const router = useRouter();

  const form = useForm<Prisma.ProductCreateInput>({
    resolver: zodResolver(schema),
    defaultValues: product,
  });

  const handleSubmit = async (data: Prisma.ProductCreateInput) => {
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update product");
      router.push("/admin");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

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
        type="number"
        {...form.register("price")}
        error={Boolean(form.formState.errors.price)}
        helperText={form.formState.errors.price?.message}
      />
      <TextField
        slotProps={{
          htmlInput: { "data-cy": "product-image" },
          formHelperText: { "data-cy": "product-image-error" } as any,
        }}
        label="Image URL"
        {...form.register("image")}
        error={Boolean(form.formState.errors.image)}
        helperText={form.formState.errors.image?.message}
      />
      <TextField
        slotProps={{
          htmlInput: { "data-cy": "product-quantity" },
          formHelperText: { "data-cy": "product-quantity-error" } as any,
        }}
        label="Quantity"
        type="number"
        {...form.register("quantity", { valueAsNumber: true })}
        error={Boolean(form.formState.errors.quantity)}
        helperText={form.formState.errors.quantity?.message}
      />
      <Button type="submit" variant="contained" color="primary">
        Save Changes
      </Button>
    </Box>
  );
}
