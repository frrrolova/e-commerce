import { ThemeOptions, createTheme } from '@mui/material/styles';

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
      xs: 300, // phone
      sm: 600, // tablets
      md: 900, // small laptop
      lg: 1200, // desktop
      xl: 1536, // large screens
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
