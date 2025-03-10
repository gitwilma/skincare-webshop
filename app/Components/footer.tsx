import { Instagram, LinkedIn } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <Box
        component="footer"
        sx={{
          padding: 1,
          color: "#4e342e",
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundColor: "#a1887f",
        }}
      >
        <Typography>Shipping</Typography>
        <Typography>Return</Typography>
        <Typography>Contact</Typography>
        <Typography>About</Typography>
        <Typography mb={2}>FAQ</Typography>
        <Typography>Follow us:</Typography>
        <Box>
          <LinkedIn />
          <Instagram />
        </Box>
        <Image src="/Beauty1.png" alt="Beauty" width={100} height={100} />
      </Box>
    </>
  );
}
