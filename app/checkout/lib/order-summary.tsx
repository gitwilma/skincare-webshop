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
  Typography,
} from "@mui/material";
import { useCart } from "../providers/CartProvider";
import theme from "../theme/theme";
import { Palette } from "@mui/icons-material";

export default function OrderSummary() {
  const { cart, removeFromCart } = useCart();

  return (
    <List sx={{ width: "100%", maxWidth: 400, mx: "auto" }}>
      {cart.length === 0 ? (
        <ListItem>
          <ListItemText primary="Varukorgen är tom" />
        </ListItem>
      ) : (
        cart.map((item) => (
          <ListItem
          data-cy="cart-item"
            key={item.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              padding: 2,
              borderBottom: "1px solid #ddd",
            }}
          >
            <ListItemAvatar>
              <Avatar
                src={item.image}
                alt={item.title}
                sx={{ width: 100, height: 100 }}
              />
            </ListItemAvatar>
            <ListItemText
              data-cy="product-quantity"
              primary={
                <Typography
                data-cy="product-title"
                  variant="h6"
                  sx={{ fontWeight: "bold", color: theme.palette.primary.light }}
                >
                  {item.title}
                </Typography>
              }
              secondary={`Antal: ${item.quantity}`}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <ListItemText data-cy="product-price" primary={`Pris: ${item.price} SEK`} />
            </Box>
            <IconButton
              onClick={() => removeFromCart(item.id)}
              sx={{
                color: theme.palette.primary.main,
                marginTop: 1,
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))
      )}
    </List>
  );
}
