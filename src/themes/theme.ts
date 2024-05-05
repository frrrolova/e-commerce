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
};

const theme = createTheme(themeOptions);

export default theme;
