"use client";

import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import Image from "next/image";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CartIcon from "./cart-icon";
import TemporaryDrawer from "./drawer";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [user, setUser] = useState<null | { email: string }>(null);

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
    await fetch("/api/auth/logout");
    setUser(null);
    handleCloseMenu();
  };

  const handleAuth = async (email: string, password: string) => {
    const endpoint = mode === "login" ? "login" : "register";
    const res = await fetch(`/api/auth/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const me = await fetch("/api/auth/me", { credentials: "include" });
      if (me.ok) {
        const userData = await me.json();
        setUser(userData);
      }
      setOpenModal(false);
    } else {
      alert(`${mode} failed`);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    };
    fetchUser();
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <Link href="/">
          <Image src="/logo.png" alt="Beauty" width={100} height={100} />
        </Link>

        <Box display="flex" alignItems="center">
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
      <MenuItem key="login" onClick={() => handleOpenModal("login")}>
        Login
      </MenuItem>,
      <MenuItem key="register" onClick={() => handleOpenModal("register")}>
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
          <TextField
            margin="dense"
            label="Username"
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
