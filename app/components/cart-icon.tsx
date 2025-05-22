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
            width: 320,
            zIndex: 10,
            p: 2,
            bgcolor: "white",
            borderRadius: "12px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
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
                  alignItems='center'
                  gap={1}
                  mb={2}
                >
                  {/* Produktbild */}
                  {item.image && (
                    <Box
                      component='img'
                      src={item.image}
                      alt={item.title}
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "4px",
                        objectFit: "cover",
                      }}
                    />
                  )}

                  {/* Produktinfo */}
                  <Box flexGrow={1}>
                    <Typography fontWeight='bold' fontSize={14}>
                      {item.title}
                    </Typography>
                    <Typography fontSize={12} color='text.secondary'>
                      {item.quantity} st x {item.price} kr
                    </Typography>
                  </Box>

                  {/* Pris högerjusterat */}
                  <Typography fontWeight='bold' fontSize={14}>
                    {item.price * item.quantity} kr
                  </Typography>
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
