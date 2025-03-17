"use client";
import { Box, Button, FormHelperText, TextField } from "@mui/material";
import { useState } from "react";

export default function AdminForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  const validate = () => {
    let newErrors = {
      title: "",
      description: "",
      price: "",
      image: "",
    };
    let isValid = true;
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
      isValid = false;
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number";
      isValid = false;
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image is required";
      isValid = false;
    } else if (
      !/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(
        formData.image
      )
    ) {
      newErrors.image =
        "Must be a valid image URL (jpg, jpeg, png, gif, webp, svg)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "price" && !/^\d*\.?\d*$/.test(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <>
      <Box
        component="form"
        data-cy="product-form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 400,
          mx: "auto",
        }}
      >
        <TextField
          slotProps={{ htmlInput: { "data-cy": "product-title" } }}
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={Boolean(errors.title)}
        />
        {errors.title && (
          <FormHelperText data-cy="product-title-error" error>
            {errors.title}
          </FormHelperText>
        )}

        <TextField
          slotProps={{ htmlInput: { "data-cy": "product-description" } }}
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={Boolean(errors.description)}
        />
        {errors.description && (
          <FormHelperText data-cy="product-description-error" error>
            {errors.description}
          </FormHelperText>
        )}
        <TextField
          slotProps={{ htmlInput: { "data-cy": "product-price" } }}
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          error={Boolean(errors.price)}
        />
        {errors.price && (
          <FormHelperText data-cy="product-price-error" error>
            {errors.price}
          </FormHelperText>
        )}

        <TextField
          slotProps={{ htmlInput: { "data-cy": "product-image" } }}
          label="Image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          error={Boolean(errors.image)}
        />
        {errors.image && (
          <FormHelperText data-cy="product-image-error" error>
            {errors.image}
          </FormHelperText>
        )}

        <Button type="submit" variant="contained" color="primary">
          Add Product
        </Button>
      </Box>
    </>
  );
}
