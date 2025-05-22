"use client";

import { ShoppingCart, Delete } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import IncreaseDecreaseBtn from "../components/increase-decrease-btn";
import { useCart } from "../providers/cart-provider";

export default function CartIcon() {
  const { cart, updateQuantity, removeFromCart, isHydrated } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
 

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);
  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  if (!isHydrated) return null;

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box position="relative" ref={dropdownRef}>
      <IconButton
        color="primary"
        onClick={() => setOpen((prev) => !prev)}
        data-cy="cart-items-count-badge"
      >
        <Badge
          badgeContent={cartCount}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "black",
              color: "white",
            },
          }}
        >
          <ShoppingCart sx={{ fontSize: 40 }} />
        </Badge>
      </IconButton>

      {open && (
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            right: 0,
            mt: 1,
            width: 400,
            maxHeight: 520,
            zIndex: 10,
            p: 2,
            bgcolor: "white",
            borderRadius: "12px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Din varukorg
          </Typography>

          <Divider sx={{ mb: 1 }} />

          <Box sx={{ maxHeight: 330, overflowY: "auto", pr: 1 }}>
            {cart.length === 0 ? (
              <Typography color="text.secondary" align="center">
                Varukorgen är tom
              </Typography>
            ) : (
              cart.map((item) => (
                <Box
                  key={item.id}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={1.5}
                  mb={2}
                >
                  <Link
                    href={`/product/${item.articleNumber}/${encodeURIComponent(item.title)}`}
                    passHref
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Avatar
                      src={item.image}
                      alt={item.title}
                      variant="rounded"
                      sx={{ width: 56, height: 56, flexShrink: 0 }}
                    />
                  </Link>

                  <Box
                    flex={1}
                    minWidth={0}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <Typography fontSize={13} fontWeight="bold" noWrap>
                      {item.title}
                    </Typography>
                    <Typography fontSize={12} color="text.secondary">
                      {item.price} kr/st
                    </Typography>
                  </Box>

                  <Box>
                    <IncreaseDecreaseBtn
                      productId={item.id}
                      quantity={item.quantity}
                      onUpdate={updateQuantity}
                    />
                  </Box>

                  <Box textAlign="right">
                    <Typography fontSize={13} fontWeight="bold">
                      {item.price * item.quantity} kr
                    </Typography>
                    <IconButton
                      onClick={() => removeFromCart(item.id)}
                      size="small"
                      sx={{ mt: 0.5, color: "gray" }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ))
            )}
          </Box>

          <Divider sx={{ my: 1 }} />

          {cart.length > 0 && (
            <Box display="flex" justifyContent="space-between" mb={1} px={0.5}>
              <Typography fontWeight="bold">Totalpris:</Typography>
              <Typography fontWeight="bold">{totalPrice} kr</Typography>
            </Box>
          )}

          <Link href="/checkout" passHref>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              data-cy="cart-link"
            >
              Gå till kassan
            </Button>
          </Link>
        </Paper>
      )}
    </Box>
  );
}