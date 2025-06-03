import { Instagram, LinkedIn } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "2px",
          backgroundColor: "black",
          mt: 4,
        }}
      >
        <Box
          component="footer"
          sx={{
            mt: "auto",
            width: "100%",
            px: 2,
            py: 4,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
            alignItems: "start",
            gap: 4,
            borderTop: "4px solid black",
            backgroundColor: "primary.light",
            fontFamily: "monospace",
            color: "black",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {/* Vänster */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography>
              <Link href="/admin" underline="none" color="black">
                Admin
              </Link>
            </Typography>
            <Typography>Return</Typography>
            <Typography>Contact</Typography>
            <Typography>About</Typography>
            <Typography>FAQ</Typography>
          </Box>

          {/* Mitten */}
          <Box sx={{ textAlign: "center" }}>
            <Box>
              <Image
                src="/logo.svg"
                alt="Beauty"
                width={0}
                height={60}
                style={{ width: "auto" }}
              />
            </Box>
            <Typography sx={{ mb: 1 }}>Follow us:</Typography>
            <IconButton
              href="https://linkedin.com"
              target="_blank"
              size="small"
              sx={{ color: "black" }}
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              href="https://instagram.com"
              target="_blank"
              size="small"
              sx={{ color: "black" }}
            >
              <Instagram />
            </IconButton>
          </Box>

      {/* Höger */}
      <Box sx={{ maxWidth: 300, justifySelf: { md: "end" }, width: "100%" }}>
        <Typography sx={{ mb: 1, textAlign: "right" }}>Subscribe to our dreamy newsletter</Typography>  
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            border: "2px solid black",
            p: 1,
            backgroundColor: "white",

          }}
        >
          <TextField
            placeholder="Your email"
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: {
                fontFamily: "monospace",
                flexGrow: 1,
              },
            }}
            fullWidth
          />
          <Button
            type="submit"
            sx={{
              fontFamily: "monospace",
              border: "2px solid black",
              borderRadius: 0,
              color: "black",
              backgroundColor: "primary.light",
              px: 2,
              "&:hover": {
                backgroundColor: "#000",
                color: "#fff",
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
     <Box sx={{ textAlign: "center", borderTop: "4px solid black", py: 2, backgroundColor: "primary.light" }}>
     <Typography sx={{ fontSize: "1rem", fontFamily: "monospace" }}>
           &copy; {new Date().getFullYear()} FermentedDreams. All rights reserved.
         </Typography>
     </Box>
     </Box>

    </>
  );
}
