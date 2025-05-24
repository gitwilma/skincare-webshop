'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
      light: "#f5e044", // accentfärg
      dark: "#0f1214", // svart off black
    },
    secondary: {
      main: "#f44336" /*accentfärger*/,
    },
    background: {
      default: "#F2F2E8",
      paper: "#E7C9FF" /*white smoke*/,
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
