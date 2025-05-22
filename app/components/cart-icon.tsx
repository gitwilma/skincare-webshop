"use client";

import { ShoppingCart } from "@mui/icons-material";
import {
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
import { useCart } from "../providers/cart-provider";

export default function CartIcon() {
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  useEffect(() => {
    setOpen(false); 
  }, [pathname]);

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

  return (
    <Box position='relative' ref={dropdownRef}>
      <IconButton
        color='primary'
        onClick={() => setOpen((prev) => !prev)}
        data-cy='cart-items-count-badge'
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
            width: 300,
            zIndex: 10,
            p: 2,
            bgcolor: "background.paper",
          }}
        >
          <Typography variant='h6' gutterBottom>
            Din varukorg
          </Typography>

          <Divider sx={{ mb: 1 }} />

          {cart.length === 0 ? (
            <Typography color='text.secondary'>Varukorgen är tom</Typography>
          ) : (
            <>
              {cart.map((item) => (
                <Box
                  key={item.id}
                  display='flex'
                  justifyContent='space-between'
                  mb={1}
                >
                  <Box>
                  <Typography fontWeight='bold'>{item.id}</Typography> {/* Namn */}
                    <Typography variant='body2' color='text.secondary'>
                      Antal: {item.quantity}
                    </Typography>
                  </Box>
                  <Typography>{item.price * item.quantity} kr</Typography>
                </Box>
              ))}

              <Divider sx={{ my: 1 }} />

              {/* GÅ TILL KASSA-KNAPPEN */}
              <Link href='/checkout' passHref>
                <Button
                  fullWidth
                  variant='contained'
                  color='primary'
                  data-cy='cart-link'
                >
                  Gå till kassan
                </Button>
              </Link>
            </>
          )}
        </Paper>
      )}
    </Box>
  );
}
