"use client";

import { AddShoppingCart } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function BuyButton() {
  return (
    <Button
      data-cy="product-buy-button"
      variant="contained"
      sx={{ margin: 0.5, bgcolor: "palette.primary.main" }}
    >
      <AddShoppingCart />
    </Button>
  );
}
