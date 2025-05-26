"use client";

import { Box, Typography } from "@mui/material";

export default function AboutPage() {
  return (
    <Box
      px={4}
      py={6}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          flex: 1,
          maxWidth: 500,
          backgroundColor: "primary.light",
          border: "4px solid black",
          padding: 4,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: 20, md: 28 },
            color: "primary.dark",
            fontFamily: "monospace",
          }}
        >
          Vi på Butik brinner för att skapa något unikt. Vår passion för
          kvalitet och hållbarhet genomsyrar varje produkt. Vi tror på
          transparens, kreativitet och gemenskap.
        </Typography>
      </Box>
    </Box>
  );
}
