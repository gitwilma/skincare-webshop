import { brown } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

'use client';


/* Använd primary.main för knappar och länkar
Använd background.default för bakgrundsfärgen
Använd text.primary för huvudtexten
Använd secondary.main för accenter och kontrastfärg */

const theme = createTheme({
  palette: {
    primary: {
        main: brown[400],
        light: brown[300],
        dark: brown[700]
    },
    secondary: {
      main: '#f44336', /*accentfärger*/
    },
    background: {
        default: brown[50],
        paper: '#F5F5F5', /*white smoke*/
    },
    text: {
        primary: brown[900], 
        secondary: brown[600]
    }
  },
  typography: {
    fontFamily: 'var(--font-poppins)',
  },
});

export default theme;
