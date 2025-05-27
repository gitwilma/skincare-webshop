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
import { useSession } from "@/auth-client"; // or wherever your auth-client exports useSession

const checkoutSchema = z.object({
  name: z.string().min(1, "Name is required"),
  street: z.string().min(1, "Street is required"),
  zipcode: z
    .string()
    .regex(/^[0-9]{5}$/, "Invalid zipcode (5 digits required)"),
  city: z.string().min(1, "City is required"),
  phone: z.string().regex(/^\d{7,15}$/, "Invalid phone number"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutForm() {
  const { data: session } = useSession();
  const user = session?.user;

  // Always call hooks at the top level!
  const router = useRouter();
  const { clearCart, cart: cartItems } = useCart();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

  // Now conditionally render
  if (!user) {
    return <Box sx={{ fontSize: "20px", fontWeight: "bold" }}>You must be logged in to place an order.</Box>;
  }

  const onSubmit = async (data: CheckoutFormValues) => {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: cartItems,
          address: data,
          customerId: user.id,
        }),
      });

 if (!res.ok) {
    const error = await res.json();
    alert(error.error || "Order failed");
    return;
  }

    const result = await res.json();
    const orderNumber = result.orderNumber;

    clearCart();
    router.push("/confirmation/" + orderNumber);
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
        slotProps={{ htmlInput: { "data-cy": "customer-street" } }}
        label="Street"
        {...register("street")}
        autoComplete="street-address"
        error={Boolean(errors.street)}
      />
      {errors.street && (
        <FormHelperText data-cy="customer-street-error" error>
          {errors.street.message}
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
