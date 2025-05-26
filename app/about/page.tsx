"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AboutPage() {
  const textBoxRef = useRef<HTMLDivElement>(null);
  const [textHeight, setTextHeight] = useState<number | null>(null);

  useEffect(() => {
    if (textBoxRef.current) {
      setTextHeight(textBoxRef.current.offsetHeight);
    }
  }, []);

  return (
    <Box
      px={4}
      py={6}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <Box
        ref={textBoxRef}
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

      <Box
        sx={{
          flex: 1,
          maxWidth: 500,
          height: textHeight ? `${textHeight}px` : "auto",
          position: "relative",
        }}
      >
        {textHeight && (
          <Image
            src="/lifestyle/ls1.jpg"
            alt="image"
            fill
            style={{
              objectFit: "cover",
              display: "block",
            }}
          />
        )}
      </Box>
    </Box>
  );
}
