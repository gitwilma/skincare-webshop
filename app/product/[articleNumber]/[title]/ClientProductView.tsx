"use client";

import BuyButton from "@/app/components/buy-button";
import { Box, CardMedia, Divider, keyframes, Typography } from "@mui/material";

const scroll = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
`;
interface Product {
  articleNumber: string;
  title: string;
  description: string;
  price: number;
  image: string;
  id: string;
  quantity: number;
}

export default function ClientProductView({ item }: { item: Product }) {
  return (
    <main>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            fontFamily: "monospace",
            width: "500px",
            marginBottom: "3rem",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: "3rem",
              fontWeight: "bold",
              backgroundColor: "yellow",
              borderBottom: "2px solid black",
              paddingBottom: "0.5rem",
            }}
          >
            {item.title}
          </Typography>

          <Typography>
            <strong> | Artikelnummer:</strong> {item.articleNumber}
          </Typography>
          <Typography>
            <strong> | Antal:</strong> {item.quantity}
          </Typography>

          <Divider sx={{ border: "2px dashed black" }} />

          <Typography sx={{ whiteSpace: "pre-wrap" }}>
            {item.description} Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </Typography>

          <Box
            sx={{
              marginTop: "auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "2px solid black",
              paddingTop: "1rem",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "red" }}>
              {item.price} KR
            </Typography>
            {item.quantity > 0 ? (
              <BuyButton product={item} />
            ) : (
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Slut i lager
              </Typography>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            overflow: "hidden",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "200%", // Must match duplicated content width
              animation: `${scroll} 20s linear infinite`,
            }}
          >
            {/* Duplicate the exact same content twice */}
            {[...Array(6)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                }}
              >
                {[...Array(10)].map((_, j) => (
                  <CardMedia
                    key={`${i}-${j}`}
                    component="img"
                    image={item.image}
                    alt={`${item.title} ${j}`}
                    sx={{
                      width: 150,
                      height: 200,
                      objectFit: "contain",
                      flexShrink: 0, // Prevent resizing
                    }}
                  />
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </main>
  );
}
