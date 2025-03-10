import { Menu, ShoppingCart } from "@mui/icons-material";
import { Box } from "@mui/material";
import Image from "next/image";
import AdminPage from "../admin/page";

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
        <Menu sx={{ fontSize: 40 }} />
        <AdminPage/>
        <Image src="/Beauty1.png" alt="Beauty" width={100} height={100} />
        <ShoppingCart sx={{ fontSize: 40 }} />
      </Box>
    </>
  );
}
