"use client";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

export default function IncreaseDecreaseBtn() {
  const [count, setCount] = useState(0);

  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0.5,    
        mx: "auto",
      }}
    >
      <Button data-cy="increase-quantity-button"
        variant="contained"
        color="primary"
        sx={{ minWidth: "auto", padding: "4px" }}
        onClick={() => setCount(count + 1)}
      >
        <ArrowDropUpIcon />
      </Button>
      <Typography>{count}</Typography>
      <Button data-cy="decrease-quantity-button"
        variant="contained"
        color="primary"
        sx={{ minWidth: "auto", padding: "4px" }}
        onClick={() => setCount(count - 1)}
      >
        <ArrowDropDownIcon />
      </Button>
    </Box>
  );
}
