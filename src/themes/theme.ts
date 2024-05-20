import { ThemeOptions, createTheme, responsiveFontSizes } from '@mui/material/styles';

// header background will need to be styled separately!

export const themeOptions: ThemeOptions = {
  palette: {
    // type: 'dark',
    mode: 'dark',
    primary: {
      main: '#448c44',
    },
    secondary: {
      main: '#f1da5a',
    },
    background: {
      default: '#162316',
      paper: '#262e22',
    },
  },
  breakpoints: {
    values: {
      // xxs: 0, // small phone
      xs: 0, // phone
      sm: 600, // tablets
      md: 900, // small laptop
      lg: 1200, // desktop
      xl: 1536, // large screens
    },
  },

  typography: {
    h1: {
      fontSize: '3.5rem',
      letterSpacing: '0.1em',
    },
    h2: {
      fontSize: '3rem',
      letterSpacing: '0.07em',
    },
    h3: {
      fontSize: '2.5rem',
    },
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          backgroundImage: 'none',
          boxShadow: 'none',
        },
      },
    },
  },
};

const theme = responsiveFontSizes(createTheme(themeOptions));

export default theme;
