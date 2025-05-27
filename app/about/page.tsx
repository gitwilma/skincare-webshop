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
      sx={{ display: "flex", flexDirection: "column", gap: 6 }}
    >
      <Box
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
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: 20, md: 28 },
              color: "primary.dark",
            }}
          >
            Vi på Butik brinner för att skapa något unikt. Vår passion för
            kvalitet och hållbarhet genomsyrar varje produkt. Vi tror på
            transparens, kreativitet och gemenskap.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 3,
              alignItems: "flex-start",
              mt: 2,
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                position: "relative",
                flexShrink: 0,
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "4px 4px #f5e044",
              }}
            >
              <Image
                src="/random/janne.jpg"
                alt="Janne Kemi"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  fontSize: 20,
                  color: "primary.main",
                }}
              >
                Janne Kemi
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  fontSize: 16,
                  color: "primary.dark",
                  mb: 1,
                }}
              >
                Nyckelinvesterare
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: "primary.dark",
                }}
              >
                Bakom lanseringen av Fermented Dreams står ingen mindre än Janne
                Kemi – finsk ultramiljonär och techvisionär. Året är 1992 och
                medan andra knappt har upptäckt internet, har Janne redan insett
                att "sura drycker med levande bakterier" är nästa stora grej.
                Med en nästan övernaturlig känsla för trender, har han gått in
                som nyckelinvesterare och gett grönt ljus till att skapa
                världens första kombucha-hemsida med e-handel.
              </Typography>
            </Box>
          </Box>
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
                boxShadow: "10px 10px #f5e044",
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
