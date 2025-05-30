'use client';

import { signOut, useSession } from '@/auth-client';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'; // för "Mina ordrar"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';

export default function NavDrawer() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);

  const { data: session } = useSession();

  const isAdmin = session?.user.isAdmin;

  const handleLogout = async () => {
    await signOut();
    setOpen(false);
  };

  // Alltid synliga
  const commonItems = [
    { text: 'Butik', icon: <StoreIcon />, href: '/' },
    { text: 'Om oss', icon: <InfoIcon />, href: '/about' },
  ];

  // Inloggad admin
  const adminItems = [
    {
      text: 'Adminorder',
      icon: <SupervisorAccountIcon />,
      href: '/adminOrder',
    },
    { text: 'Admin', icon: <AdminPanelSettingsIcon />, href: '/admin' },
  ];

  // Inloggad vanlig användare
  const userItems = [
    { text: 'Mina ordrar', icon: <ReceiptLongIcon />, href: '/orders' },
  ];

  // Gemensamt för alla inloggade och utloggade
  const bottomItems = [
    { text: 'Kundvagn', icon: <ShoppingCartIcon />, href: '/cart' },
    { text: 'Konto', icon: <AccountCircleIcon />, href: '/account' },
  ];

  const buildMenu = () => {
    const items = [...commonItems];

    if (session) {
      if (isAdmin) {
        items.push(...adminItems);
      } else {
        items.push(...userItems);
      }
    }

    items.push(...bottomItems);
    return items;
  };

  const DrawerList = (
    <Box
      sx={{ width: 250, bgcolor: '#F5E044' }}
      role='presentation'
      onClick={toggleDrawer(false)}>
      <List>
        {session && (
          <>
            <ListItem key='greeting'>
              <Typography variant='body2'>Hej {session.user.email}</Typography>
            </ListItem>
            <ListItem
              key='logout'
              onClick={handleLogout}>
              <ListItemButton>
                <ListItemText primary='Logga ut' />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
      <Divider />
      <List>
        {buildMenu().map((item) => (
          <ListItem
            key={item.text}
            disablePadding>
            <Link
              href={item.href}
              passHref
              legacyBehavior>
              <ListItemButton component='a'>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  

  return (
    <Box sx={{ display: { md: 'none' }, fontSize: 10 }}>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon sx={{ fontSize: 40 }} />
      </Button>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}
