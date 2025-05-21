"use client";

import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import { Product } from "@prisma/client";
import { useCart } from "../providers/cart-provider";

interface BuyButtonProps {
  product: Product;
}

export default function BuyButton({ product }: BuyButtonProps) {
  const { addToCart } = useCart();

  const handleClick = () => {
    addToCart(product);
  };

  return (
    <div>
     <Button
  variant="contained"
  onClick={handleClick}
  sx={{
    m: 0.5,
    border: "2px solid black",
    borderRadius: 0,
    bgcolor: "black",
    color: "white",
    boxShadow: "none",
    "&:hover": {
      bgcolor: "white",
      color: "black",
      border: "2px solid black",
      boxShadow: "none",

    },
  }}
>
  <AddIcon sx={{ fontSize: 20 }} />
</Button>

    </div>
  );
}
