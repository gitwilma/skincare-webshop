import { ShoppingCart } from "@mui/icons-material";
import { Box } from "@mui/material";
import Image from "next/image";
import TemporaryDrawer from "./drawer";

export default function Header() {
  return (
    <>
      <Box
        component="header"
        sx={{
          padding: 1,
          color: "primary.main",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TemporaryDrawer />
        <Image src="/Beauty1.png" alt="Beauty" width={100} height={100} />
        <ShoppingCart sx={{ fontSize: 40 }} />
      </Box>
    </>
  );
}
