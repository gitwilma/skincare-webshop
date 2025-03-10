"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <Box
      component="form"
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
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        autoComplete="name"
      />
      <TextField
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        autoComplete="street-address"
      />
      <TextField
        label="Zip code"
        name="zipcode"
        value={formData.zipcode}
        onChange={handleChange}
        autoComplete="postal-code"
      />
      <TextField
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
        autoComplete="address-level2"
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        autoComplete="email"
      />
      <TextField
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        autoComplete="tel"
      />

      <Button type="submit" variant="contained" color="primary">
        Confirm
      </Button>
    </Box>
  );
}
