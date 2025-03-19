"use client";

import { getProductById, updateProduct } from "@/app/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { Prisma } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive("Price must be a positive number"),
  image: z.string().url("Image must be a valid URL"),
});

export default function AdminEditProduct({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = params?.id as string; // Hämta ID från URL
  console.log("Received product ID from URL params:", productId);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<Prisma.ProductCreateInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      image: "",
    },
  });

  useEffect(() => {
    if (!productId) {
      setError("Missing product ID");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        console.log("Fetching product with ID:", productId); // ✅ Debugging
        const fetchedProduct = await getProductById(productId); // Hämta produktdata
        if (fetchedProduct) {
          form.reset(fetchedProduct); // Sätt produktdata i formuläret
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Fetch error:", err); // ✅ Logga felet
        setError("Failed to fetch product");
      }
      setLoading(false);
    };

    fetchProduct();
  }, [productId, form]);

  const handleSubmit = async (data: Prisma.ProductCreateInput) => {
    if (!productId) return;

    try {
      await updateProduct(productId, data); // Uppdatera produkten
      router.push("/admin");
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product");
    }
  };

  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto" }} />;
  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

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
        label="Title"
        {...form.register("title")}
        error={Boolean(form.formState.errors.title)}
        helperText={form.formState.errors.title?.message}
      />
      <TextField
        label="Description"
        {...form.register("description")}
        error={Boolean(form.formState.errors.description)}
        helperText={form.formState.errors.description?.message}
      />
      <TextField
        label="Price"
        type="number"
        {...form.register("price")}
        error={Boolean(form.formState.errors.price)}
        helperText={form.formState.errors.price?.message}
      />
      <TextField
        label="Image URL"
        {...form.register("image")}
        error={Boolean(form.formState.errors.image)}
        helperText={form.formState.errors.image?.message}
      />
      <Button type="submit" variant="contained" color="primary">
        Save Changes
      </Button>
    </Box>
  );
}
