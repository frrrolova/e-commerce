import { ThemeProvider } from '@mui/material/styles';
import Routing from './routes/Routing';
import theme from './themes/theme';
import { Provider } from 'react-redux';
import { Box, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import initStore from './store/store.ts';
import { Cart } from '@commercetools/platform-sdk';
import { SnackbarProvider } from 'notistack';
import styles from '@/App.module.scss';
import texture from '/images/texture.webp';

function App({ cart }: { cart: Cart | null }) {
  return (
    <Provider store={initStore(cart)}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3} classes={{ containerRoot: styles.test }}>
            <Box
              component="img"
              sx={{
                position: 'absolute',
                zIndex: -10000,
                width: '100%',
                height: '100%',
                minHeight: '100vh',
              }}
              alt="Ficus"
              src={texture}
            />
            <CssBaseline />
            <Routing />
          </SnackbarProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
