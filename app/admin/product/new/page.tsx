"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Prisma } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive("Price must be a positive number"),
  image: z.string().url("Image must be a valid URL"),
  quantity: z.coerce.number().int().min(0, "Quantity must be 0 or more"),
});

export default function AdminForm() {
  const form = useForm<Prisma.ProductCreateInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      image: "",
      quantity: 1,
    },
  });

  const handleSubmit = async (product: Prisma.ProductCreateInput) => {
    try {
      const res = await fetch("/api/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error("Failed to add product");
      form.reset();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <main>
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
          marginBottom: "50px",
          marginTop: "70px",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            display: "flex",
            justifyContent: "center",
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "primary.main",
            marginBottom: 9,
          }}
        >
          Lägg till en produkt
        </Typography>
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
          {...form.register("price", { valueAsNumber: true })}
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
        <TextField
          slotProps={{
            htmlInput: { "data-cy": "product-quantity" },
            formHelperText: { "data-cy": "product-quantity-error" } as any,
          }}
          label="Quantity"
          {...form.register("quantity", { valueAsNumber: true })}
          error={Boolean(form.formState.errors.quantity)}
          helperText={form.formState.errors.quantity?.message}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Product
        </Button>
      </Box>
    </main>
  );
}
