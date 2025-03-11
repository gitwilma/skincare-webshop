import { Menu, ShoppingCart } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

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
        <Image src="/Beauty1.png" alt="Beauty" width={100} height={100} />
        <Link href="/checkout">
          <IconButton color="primary">
            <ShoppingCart sx={{ fontSize: 40 }} />
          </IconButton>
        </Link>
      </Box>
    </>
  );
}
{
  /* <Typography variant="h1">Admin</Typography> */
}
