"use client";

import { Product } from "@/data";
import { AddShoppingCart } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useCart } from "../providers/cart-provider";

interface BuyButtonProps {
  product: Product;
}

export default function BuyButton({ product }: BuyButtonProps) {
  const { addToCart } = useCart();

  return (
    <Button
      data-cy="product-buy-button"
      variant="contained"
      sx={{ margin: 0.5, bgcolor: "palette.primary.main" }}
      onClick={() => addToCart(product)}
    >
      <AddShoppingCart />
    </Button>
  );
}
