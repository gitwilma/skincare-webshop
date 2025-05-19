'use client';

import { brown } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#FD4701",
      light: brown[300],
      dark: brown[700],
    },
    secondary: {
      main: "#f44336" /*accentfärger*/,
    },
    background: {
      default: "#F2F2E8",
      paper: "#F5F5F5" /*white smoke*/,
    },
    text: {
      primary: brown[900],
      secondary: brown[600],
    },
  },
  typography: {
    fontFamily: "var(--font-poppins)",
    fontWeightRegular: 600, // Standardtext
    fontWeightMedium: 700, // Mellanrubriker
    fontWeightBold: 800, // Rubriker 
  },
});

export default theme;
