import { Menu } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function Header() {
  return (
    <>
      <Box
        component="header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h1">Admin</Typography>
        <Menu />

        <Image src="/Beauty.png" alt="Beauty" width={100} height={100} />
      </Box>
    </>
  );
}
