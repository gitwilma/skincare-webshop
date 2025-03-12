"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutForm() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    zipcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    address: "",
    zipcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const validate = () => {
    let newErrors = {
      name: "",
      address: "",
      zipcode: "",
      city: "",
      email: "",
      phone: "",
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    }
    if (!/^[0-9]{5}$/.test(formData.zipcode)) {
      newErrors.zipcode = "Invalid zipcode (5 digits required)";
      isValid = false;
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
      isValid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }
    if (!/^\d{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <Box
      component="form"
      data-cy="customer-form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        mx: "auto",
      }}
    >
      <Typography variant="h5">Delivery</Typography>

      <TextField
        slotProps={{ htmlInput: { "data-cy": "customer-name" } }}
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        autoComplete="name"
        error={Boolean(errors.name)}
        helperText={errors.name}
        required
        data-cy="customer-name-error"
      />
      <TextField
        slotProps={{ htmlInput: { "data-cy": "customer-address" } }}
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        autoComplete="street-address"
        error={Boolean(errors.address)}
        helperText={errors.address}
        required
        data-cy="customer-address-error"
      />
      <TextField
        slotProps={{ htmlInput: { "data-cy": "customer-zipcode" } }}
        label="Zip code"
        name="zipcode"
        value={formData.zipcode}
        onChange={handleChange}
        autoComplete="postal-code"
        error={Boolean(errors.zipcode)}
        helperText={errors.zipcode}
        required
        data-cy="customer-zipcode-error"
      />
      <TextField
        slotProps={{ htmlInput: { "data-cy": "customer-city" } }}
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
        autoComplete="address-level2"
        error={Boolean(errors.city)}
        helperText={errors.city}
        required
        data-cy="customer-city-error"
      />
      <TextField
        slotProps={{ htmlInput: { "data-cy": "customer-email" } }}
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        autoComplete="email"
        error={Boolean(errors.email)}
        helperText={errors.email}
        required
        data-cy="customer-email-error"
      />
      <TextField
        slotProps={{ htmlInput: { "data-cy": "customer-phone" } }}
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        autoComplete="tel"
        error={Boolean(errors.phone)}
        helperText={errors.phone}
        required
        data-cy="customer-phone-error"
      />

      <Link href="/confirmation">
        <Button type="submit" variant="contained" color="primary">
          Confirm
        </Button>
      </Link>
    </Box>
  );
}
