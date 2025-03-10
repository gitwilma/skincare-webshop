import { Instagram, LinkedIn } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <Box
        component="footer"
        sx={{
          padding: 2,
          color: "#4e342e",
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundColor: "#a1887f",

          "@media (min-width: 600px)": {
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "center",
          },

          "@media (min-width: 1280px)": {
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "center",
          },
        }}
      >
        <Typography>Shipping</Typography>
        <Typography>Return</Typography>
        <Typography>Contact</Typography>
        <Typography>About</Typography>
        <Typography mb={1}>FAQ</Typography>
        <Box>
          <Typography>Follow us:</Typography>
          <LinkedIn />
          <Instagram />
        </Box>
        <Image src="/Beauty.png" alt="Beauty" width={100} height={100} />
      </Box>
    </>
  );
}
