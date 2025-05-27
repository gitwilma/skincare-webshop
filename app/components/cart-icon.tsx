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
import NextLink from "next/link";
import Image from "next/image";


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
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  if (!isHydrated) return null;

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Box position="relative" ref={dropdownRef}>
      <Box
  sx={{
    position: "relative",
    display: "inline-block",
    cursor: "pointer",
  }}
  onClick={() => setOpen((prev) => !prev)}
>
  <Typography
    variant="h6"
    sx={{
      textTransform: "uppercase",
      fontWeight: 700,
      letterSpacing: "0.1em",
      color: "primary.main",
      fontFamily: "monospace",
    }}
  >
    kundvagn
  </Typography>

  {cartCount > 0 && (
    <Badge
      badgeContent={cartCount}
      sx={{
        position: "absolute",
        top: -3,
        right: -5,
        "& .MuiBadge-badge": {
          backgroundColor: "black",
          color: "white",
          fontSize: "1rem",
          height: 20,
          minWidth: 20,
          fontFamily: "monospace",

        },
      }}
    />
  )}
</Box>


      {open && (
      <Paper
      elevation={0} // No elevation
      sx={{
        position: "absolute",
        right: 0,
        mt: 1,
        width: 400,
        maxHeight: 520,
        zIndex: 10,
        p: 2,
        bgcolor: "primary.light",
        border: "3px solid black",
        borderRadius: 0, // Sharp corners
        overflow: "hidden",
        fontFamily: "monospace", // Consistent brutalist feel
      }}
    >
    
          <Typography variant="h6" gutterBottom sx={{  textTransform: "uppercase",
    fontWeight: 900,
    fontFamily: "monospace",
    fontSize: "1rem", }}>
            Din varukorg
          </Typography>

          <Divider
  sx={{
    borderColor: "black",
    borderBottomWidth: "2px",
    my: 1,
  }}
/>

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
                    href={`/product/${item.articleNumber}/${encodeURIComponent(
                      item.title
                    )}`}
                    passHref
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={56}
                      height={56}
                      style={{ objectFit: "contain", borderRadius: "4px" }}
                    />
                  </Link>

                  <Box
                    flex={1}
                    minWidth={0}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <Typography fontSize={16} fontWeight="bold" noWrap>
                      {item.title}
                    </Typography>
                    <Typography fontSize={13} color="text.secondary">
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
                      sx={{ mt: 0.5, color: "black" }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ))
            )}
          </Box>

          <Divider
  sx={{
    borderColor: "black",
    borderBottomWidth: "2px",
    my: 1,
  }}
/>

          {cart.length > 0 && (
            <Box display="flex" justifyContent="space-between" mb={1} px={0.5}>
              <Typography fontWeight="bold">Totalpris:</Typography>
              <Typography fontWeight="bold">{totalPrice} kr</Typography>
            </Box>
          )}

<Button
  component={NextLink}
  href="/checkout"
  fullWidth
  variant="contained"
  sx={{
    backgroundColor: "black",
    color: "white",
    border: "2px solid black",
    borderRadius: 0,
    fontFamily: "monospace",
    fontWeight: 700,
    textTransform: "uppercase",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
  }}
>
  Gå till kassan
</Button>


        </Paper>
      )}
    </Box>
  );
}
