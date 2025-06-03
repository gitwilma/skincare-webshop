'use client';

import { signOut, useSession } from '@/auth-client';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';

// Ikoner
import { AccountCircle } from '@mui/icons-material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { AppUser } from '../types/user';
import GitHubSignInButton from './github-button';

export default function NavDrawer() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const { data: session } = useSession();
  const user: AppUser | null = (session?.user as AppUser | undefined) ?? null;

  const isAdmin = session?.user?.isAdmin;

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenModal = (selectedMode: 'login' | 'register') => {
    setMode(selectedMode);
    setOpenModal(true);
    handleCloseMenu();
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogout = async () => {
    await signOut();
    setOpen(false);
  };

  const menuItems = [
    { text: 'Butik', icon: <StoreIcon />, href: '/' },
    { text: 'Om oss', icon: <InfoIcon />, href: '/about' },
    ...(session && isAdmin
      ? [
          {
            text: 'Adminorder',
            icon: <SupervisorAccountIcon />,
            href: '/adminOrder',
          },
          { text: 'Admin', icon: <AdminPanelSettingsIcon />, href: '/admin' },
        ]
      : session
      ? [{ text: 'Mina ordrar', icon: <ReceiptLongIcon />, href: '/orders' }]
      : []),
    { text: 'Kundvagn', icon: <ShoppingCartIcon />, href: '/checkout' },
  ];

  return (
    <Box sx={{ display: { md: 'none' } }}>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon sx={{ fontSize: 40 }} />
      </Button>

      <Drawer
        open={open}
        onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role='presentation'
          onClick={toggleDrawer(false)}>
          <List>
            {session && (
              <>
                <ListItem>
                  <Typography variant='body2'>
                    Hej {session.user.email}
                  </Typography>
                </ListItem>
                <ListItem
                  disablePadding
                  onClick={handleLogout}>
                  <ListItemButton>
                    <ListItemText primary='Logga ut' />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            )}

            {menuItems.map(({ text, icon, href }) => (
              <ListItem
                key={text}
                disablePadding>
                <Link
                  href={href}
                  passHref
                  legacyBehavior>
                  <ListItemButton component='a'>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}

            {!user
              ? [
                  <ListItem
                    disablePadding
                    key='login'
                    onClick={handleProfileClick}>
                    <ListItemButton component='a'>
                      <ListItemIcon>
                        <AccountCircle />
                      </ListItemIcon>

                      <ListItemText>
                        <Typography>Konto</Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>,
                ]
              : [
                  <ListItem key='Greeting'>
                    <Typography></Typography>
                  </ListItem>,
                ]}
          </List>
        </Box>
      </Drawer>

      <Menu
        sx={{
          '& .MuiPaper-root': {
            border: 2,
            backgroundColor: 'primary.light',
            color: 'primary.main',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          },
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}>
        <MenuItem
          key='login'
          onClick={() => handleOpenModal('login')}>
          Logga in
        </MenuItem>
        ,
        <MenuItem
          key='register'
          onClick={() => handleOpenModal('register')}>
          Registrera dig
        </MenuItem>
        ,
      </Menu>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}>
        <DialogTitle>
          {mode === 'login' ? 'Logga in' : 'Registrera dig'}
        </DialogTitle>
        <DialogContent>
          <GitHubSignInButton />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
