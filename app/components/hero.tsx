// hero-section.tsx
"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function HeroSection() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 500, md: 600 },
        overflow: "hidden",
        borderBottom: "2px solid black",
      }}
    >
      <Image
        src="./lifestyle/ls2.jpg"
        alt="Hero Image"
        fill
        style={{ objectFit: "cover" }}
      />

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.1)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 2,
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 2,
        }}
      >
        <Box maxWidth={800}>
          <Typography
            variant="h2"
            sx={{
              color: "#fff",
              fontFamily: "monospace",
              fontWeight: 700,
              textTransform: "uppercase",
              fontSize: { xs: 40, md: 60 },
              mb: 2,
            }}
          >
            Fermented Dreams
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#f2f2f2",
              fontFamily: "monospace",
              fontSize: { xs: 14, md: 16 },
              backgroundColor: "rgba(0,0,0,0.5)",
              padding: 2,
              border: "2px solid white",
            }}
          >
            Upptäck vår ekologiska kombucha – en fermenterad tedryck bryggd med naturliga ingredienser
            och levande bakteriekultur (SCOBY). Ett smakrikt och hälsosamt alternativ till läsk,
            tillverkat i liten skala med omtanke och kvalitet.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
