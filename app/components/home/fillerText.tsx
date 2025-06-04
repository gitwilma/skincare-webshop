"use client";

import { Box, Typography } from "@mui/material";
import React from "react";

type Props = {
  text: string;
};

export default function DescriptionText({ text }: Props) {
  return (
    <Box
      px={2}
      py={4}
      sx={{
        borderBottom: "4px solid black",
        borderTop: "4px solid black",
        backgroundColor: "primary.light",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: "primary.dark",
          fontFamily: "monospace",
          fontSize: { xs: 30, md: 50 },
          maxWidth: "lg",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}
