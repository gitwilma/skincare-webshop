"use client";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function IncreaseDecreaseBtn() {
  const [count, setCount] = useState(0);

  return (
    <Stack spacing={2} alignItems="center">
      <Typography variant="h4">Count: {count}</Typography>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCount(count + 1)}
        >
          <ArrowDropUpIcon />
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setCount(count - 1)}
        >
          <ArrowDropDownIcon />
        </Button>
      </Stack>
    </Stack>
  );
}
