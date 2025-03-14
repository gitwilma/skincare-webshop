import { Box, IconButton, Link } from "@mui/material";
import Image from "next/image";
import CartIcon from "./cart-icon";
import TemporaryDrawer from "./drawer";

export default function Header() {
  return (
    <>
      <Box
        component="header"
        sx={{
          padding: 1,
          color: "palette.primary.main",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TemporaryDrawer />
        <Link href="/">
          <Image src="/Beauty1.png" alt="Beauty" width={100} height={100} />
        </Link>
        <Link data-cy="cart-link" href="/checkout">
          <IconButton color="primary">
            <CartIcon />
          </IconButton>
        </Link>
      </Box>
    </>
  );
}
