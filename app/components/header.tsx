"use client";

import { signOut, useSession } from "@/auth-client";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AppUser } from "../types/user";
import CartIcon from "./cart-icon";
import TemporaryDrawer from "./drawer";
import GitHubSignInButton from "./github-button";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localUser, setLocalUser] = useState<AppUser | null>(null);
  const { data: session } = useSession(); //better-auth session
  const user: AppUser | null =
    localUser ?? (session?.user as AppUser | undefined) ?? null;

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = (type: "login" | "register") => {
    setMode(type);
    setOpenModal(true);
    handleCloseMenu();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogout = async () => {
    localStorage.removeItem("user");
    setLocalUser(null);
    await signOut();
    handleCloseMenu();
  };

  const handleAuth = async (email: string, password: string) => {
    const endpoint = mode === "login" ? "/api/login" : "/api/register";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data.user));
      setLocalUser(data.user);
      setOpenModal(false);
    } else {
      alert(`${mode} failed`);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setLocalUser(JSON.parse(saved));
    }
  }, []);

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
        }}
      >
        <TemporaryDrawer />
        <Box sx={{ flex: 1, position: "relative", height: 80 }}>
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

          <Link data-cy="cart-link" href="/checkout">
            <IconButton data-cy="cart-items-count-badge" color="primary">
              <CartIcon />
            </IconButton>
          </Link>

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
                    Login
                  </MenuItem>,
                  <MenuItem
                    key="register"
                    onClick={() => handleOpenModal("register")}
                  >
                    Register
                  </MenuItem>,
                ]
              : [
                  <MenuItem key="greeting" disabled>
                    <Typography variant="body2">Hi, {user.email}</Typography>
                  </MenuItem>,
                  <MenuItem key="logout" onClick={handleLogout}>
                    Logout
                  </MenuItem>,
                ]}
          </Menu>
        </Box>
      </Box>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{mode === "login" ? "Login" : "Register"}</DialogTitle>
        <DialogContent>
          <GitHubSignInButton />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={() => handleAuth(email, password)}>
            {mode === "login" ? "Login" : "Register"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
