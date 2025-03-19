"use client";

import { useCart } from "@/app/providers/cart-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { processCheckout } from "../actions/process-checkout";

// Zod schema för validering
const checkoutSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  zipcode: z
    .string()
    .regex(/^[0-9]{5}$/, "Invalid zipcode (5 digits required)"),
  city: z.string().min(1, "City is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{7,15}$/, "Invalid phone number"),
});

// Typ baserad på Zod-schemat
type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutForm() {
  const router = useRouter();
  const { clearCart, cart: cartItems } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    console.log("Form submitted with data:", data); // Kontrollera om denna logg visas
    const response = await processCheckout(cartItems, data);

    try {
      console.log("Running response");
      clearCart();
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <Box
      component="form"
      data-cy="customer-form"
      onSubmit={handleSubmit(onSubmit)}
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
        {...register("name")}
        autoComplete="name"
        error={Boolean(errors.name)}
      />
      {errors.name && (
        <FormHelperText data-cy="customer-name-error" error>
          {errors.name.message}
        </FormHelperText>
      )}

      <TextField
        slotProps={{ htmlInput: { "data-cy": "customer-address" } }}
        label="Address"
        {...register("address")}
        autoComplete="street-address"
        error={Boolean(errors.address)}
      />
      {errors.address && (
        <FormHelperText data-cy="customer-address-error" error>
          {errors.address.message}
        </FormHelperText>
      )}

      <TextField
        slotProps={{ htmlInput: { "data-cy": "customer-zipcode" } }}
        label="Zip code"
        {...register("zipcode")}
        autoComplete="postal-code"
        error={Boolean(errors.zipcode)}
      />
      {errors.zipcode && (
        <FormHelperText data-cy="customer-zipcode-error" error>
          {errors.zipcode.message}
        </FormHelperText>
      )}

      <TextField
        slotProps={{ htmlInput: { "data-cy": "customer-city" } }}
        label="City"
        {...register("city")}
        autoComplete="address-level2"
        error={Boolean(errors.city)}
      />
      {errors.city && (
        <FormHelperText data-cy="customer-city-error" error>
          {errors.city.message}
        </FormHelperText>
      )}

      <TextField
        slotProps={{ htmlInput: { "data-cy": "customer-email" } }}
        label="Email"
        {...register("email")}
        autoComplete="email"
        error={Boolean(errors.email)}
      />
      {errors.email && (
        <FormHelperText data-cy="customer-email-error" error>
          {errors.email.message}
        </FormHelperText>
      )}

      <TextField
        slotProps={{ htmlInput: { "data-cy": "customer-phone" } }}
        label="Phone"
        {...register("phone")}
        autoComplete="tel"
        error={Boolean(errors.phone)}
      />
      {errors.phone && (
        <FormHelperText data-cy="customer-phone-error" error>
          {errors.phone.message}
        </FormHelperText>
      )}

      <Button type="submit" variant="contained" color="primary">
        Confirm
      </Button>
    </Box>
  );
}
