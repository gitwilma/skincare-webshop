"use client";

import { useCart } from "@/app/providers/cart-provider";
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { processCheckout } from "../actions/process-checkout";

export default function CheckoutForm() {
  const router = useRouter();
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

  const [errorMessage, setErrorMessage] = useState("");

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

  const { clearCart } = useCart();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const form = new FormData();
        Object.entries(formData).forEach(([key, value]) =>
          form.append(key, value)
        );

        await processCheckout(form);
        clearCart();
      } catch (error) {
        setErrorMessage("Något gick fel. Försök igen.");
      }
      console.log("cart");
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
      />
      {errors.name && (
        <FormHelperText data-cy="customer-name-error" error>
          {errors.name}
        </FormHelperText>
      )}

      <TextField
        slotProps={{ htmlInput: { "data-cy": "customer-address" } }}
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        autoComplete="street-address"
        error={Boolean(errors.address)}
      />
      {errors.address && (
        <FormHelperText data-cy="customer-address-error" error>
          {errors.address}
        </FormHelperText>
      )}

      <TextField
        slotProps={{ htmlInput: { "data-cy": "customer-zipcode" } }}
        label="Zip code"
        name="zipcode"
        value={formData.zipcode}
        onChange={handleChange}
        autoComplete="postal-code"
        error={Boolean(errors.zipcode)}
      />
      {errors.zipcode && (
        <FormHelperText data-cy="customer-zipcode-error" error>
          {errors.zipcode}
        </FormHelperText>
      )}

      <TextField
        slotProps={{ htmlInput: { "data-cy": "customer-city" } }}
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
        autoComplete="address-level2"
        error={Boolean(errors.city)}
      />
      {errors.city && (
        <FormHelperText data-cy="customer-city-error" error>
          {errors.city}
        </FormHelperText>
      )}

      <TextField
        slotProps={{ htmlInput: { "data-cy": "customer-email" } }}
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        autoComplete="email"
        error={Boolean(errors.email)}
      />
      {errors.email && (
        <FormHelperText data-cy="customer-email-error" error>
          {errors.email}
        </FormHelperText>
      )}

      <TextField
        slotProps={{ htmlInput: { "data-cy": "customer-phone" } }}
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        autoComplete="tel"
        error={Boolean(errors.phone)}
      />
      {errors.phone && (
        <FormHelperText data-cy="customer-phone-error" error>
          {errors.phone}
        </FormHelperText>
      )}

      <Button type="submit" variant="contained" color="primary">
        Confirm
      </Button>
    </Box>
  );
}
