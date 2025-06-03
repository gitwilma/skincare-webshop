'use client';

import { signOut, useSession } from '@/auth-client';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { AppUser } from '../types/user';
import CartIcon from './cart-icon';
import GitHubSignInButton from './github-button';
import NavDrawer from './navDrawer';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const { data: session } = useSession();
  const user: AppUser | null = (session?.user as AppUser | undefined) ?? null;

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = (selectedMode: 'login' | 'register') => {
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
        component='header'
        sx={{
          px: 4,
          py: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: 'primary.light',
          borderBottom: '4px solid black',
        }}>
        <NavDrawer />
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            gap: 7,
            alignItems: 'center',
          }}>
          <Link
            href='#'
            underline='none'>
            <Typography
              variant='h6'
              sx={{
                textTransform: 'uppercase',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: 'primary.main',
                fontFamily: 'monospace',
              }}>
              butik
            </Typography>
          </Link>
          <Link
            href='/about'
            underline='none'>
            <Typography
              variant='h6'
              sx={{
                textTransform: 'uppercase',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: 'primary.main',
                fontFamily: 'monospace',
              }}>
              om oss
            </Typography>
          </Link>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}>
          <Link href='/'>
            <Image
              src='/logo.svg'
              alt='Logo'
              width={100}
              height={60}
              style={{ width: 'auto', height: 60 }}
            />
          </Link>
        </Box>

        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            gap: 7,
            alignItems: 'center',
          }}>
          {user && (
            <Link
              href='/adminOrder'
              underline='none'
              sx={{ mr: 1 }}>
              <Typography
                variant='h6'
                sx={{
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: 'primary.main',
                  fontFamily: 'monospace',
                }}>
                {user.isAdmin ? 'AdminOrder' : ''}
              </Typography>
            </Link>
          )}

          {user && (
            <Link
              href={user.isAdmin ? '/admin' : '/orders'}
              underline='none'
              sx={{ mr: 1 }}>
              <Typography
                variant='h6'
                sx={{
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: 'primary.main',
                  fontFamily: 'monospace',
                }}>
                {user.isAdmin ? 'Admin' : 'Mina ordrar'}
              </Typography>
            </Link>
          )}

          <Box
            data-cy='cart-items-count-badge'
            color='primary'>
            <CartIcon />
          </Box>

          <Typography
            variant='h6'
            onClick={handleProfileClick}
            sx={{
              textTransform: 'uppercase',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: 'primary.main',
              fontFamily: 'monospace',
              cursor: 'pointer',
            }}>
            konto
          </Typography>

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
            {!user
              ? [
                  <MenuItem
                    key='login'
                    onClick={() => handleOpenModal('login')}>
                    Logga in
                  </MenuItem>,
                  <MenuItem
                    key='register'
                    onClick={() => handleOpenModal('register')}>
                    Registrera dig
                  </MenuItem>,
                ]
              : [
                  <MenuItem
                    key='greeting'
                    disabled>
                    <Typography variant='body2'>Hej, {user.email}</Typography>
                  </MenuItem>,
                  <MenuItem
                    key='logout'
                    onClick={handleLogout}>
                    Logga ut
                  </MenuItem>,
                ]}
          </Menu>
        </Box>
      </Box>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}>
        <DialogTitle>
          {mode === 'login' ? 'Logga in' : 'Registrera dig'}
        </DialogTitle>
        <DialogContent>
          <GitHubAuthButton mode={mode} />
        </DialogContent>
      </Dialog>
    </>
  );
}
