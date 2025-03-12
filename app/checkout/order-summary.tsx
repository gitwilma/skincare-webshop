"use client";

import { CartItem } from "@/data";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";

export default function OrderSummary() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  return (
    <Box
    sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 400,
        mx: "auto",
      }}>
      <List
       data-cy="cart-item">
        {cart.length === 0 ? (
          <ListItem>
            <ListItemText primary="Varukorgen är tom" />
          </ListItem>
        ) : (
          cart.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={`${item.title} (x${item.quantity})`}
                secondary={`$${item.price * item.quantity}`}
              />
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
}
