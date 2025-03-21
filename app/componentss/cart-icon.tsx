"use client";

import { ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { useCart } from "../providers/cart-provider";

export default function CartIcon() {
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Badge badgeContent={cartCount} color="primary">
      <ShoppingCart sx={{ fontSize: 40 }} />
    </Badge>
  );
}
