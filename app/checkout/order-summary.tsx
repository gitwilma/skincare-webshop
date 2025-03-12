"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useCart } from "../providers/CartProvider";

export default function OrderSummary() {
  const { cart, removeFromCart } = useCart();

  console.log(cart);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 400,
        mx: "auto",
      }}
    >
      <List data-cy="cart-item">
        {cart.length === 0 ? (
          <ListItem>
            <ListItemText primary="Varukorgen är tom" />
          </ListItem>
        ) : (
          cart.map((item) => (
            <ListItem key={item.id}>
              <ListItemAvatar>
                <Avatar
                  src={item.image}
                  alt={item.title}
                  sx={{ width: 50, height: 50 }}
                />
              </ListItemAvatar>
              <ListItemText
                data-cy="product-quantity"
                primary={`Produkt: ${item.title}`}
                secondary={`Antal: ${item.quantity}`}
              />
              <IconButton
                onClick={() => removeFromCart(item.id)}
                color="secondary"
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
}
