"use client";

import { signOut, useSession } from "@/auth-client";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { AppUser } from "../types/user";
import CartIcon from "./cart-icon";
import TemporaryDrawer from "./drawer";
import GitHubSignInButton from "./github-button";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");

  const { data: session } = useSession();
  const user: AppUser | null = (session?.user as AppUser | undefined) ?? null;

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = (selectedMode: "login" | "register") => {
    setMode(selectedMode);
    setOpenModal(true);
    handleCloseMenu();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogout = async () => {
    await signOut();
    handleCloseMenu();
  };

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
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "background.default",
          borderBottom: "2px solid black",
        }}
      >
        <TemporaryDrawer />
        <Box sx={{ flex: 1, position: "relative", height: 80,        
 }}>
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Link href="/">
              <Image src="/logotype.png" alt="Beauty" width={150} height={80} />
            </Link>
          </Box>
        </Box>

        <Box display="flex" alignItems="center">
          {user && (
            <>
              {user.isAdmin ? (
                <Link href="/admin" underline="none" sx={{ marginRight: 2 }}>
                  <Typography variant="body2" color="primary">
                    Admin
                  </Typography>
                </Link>
              ) : (
                <Link href="/orders" underline="none" sx={{ marginRight: 2 }}>
                  <Typography variant="body2" color="primary">
                    Mina ordrar
                  </Typography>
                </Link>
              )}
            </>
          )}

      
            <IconButton data-cy="cart-items-count-badge" color="primary">
              <CartIcon />
            </IconButton>
         

          <IconButton color="primary" onClick={handleProfileClick}>
            <AccountCircleIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            {!user
              ? [
                  <MenuItem
                    key="login"
                    onClick={() => handleOpenModal("login")}
                  >
                    Logga in
                  </MenuItem>,
                  <MenuItem
                    key="register"
                    onClick={() => handleOpenModal("register")}
                  >
                    Registrera dig
                  </MenuItem>,
                ]
              : [
                  <MenuItem key="greeting" disabled>
                    <Typography variant="body2">Hej, {user.email}</Typography>
                  </MenuItem>,
                  <MenuItem key="logout" onClick={handleLogout}>
                    Logga ut
                  </MenuItem>,
                ]}
          </Menu>
        </Box>
      </Box>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>
          {mode === "login" ? "Logga in" : "Registrera dig"}
        </DialogTitle>
        <DialogContent>
          <GitHubSignInButton />
        </DialogContent>
      </Dialog>
    </>
  );
}
