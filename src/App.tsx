import './App.scss';
import { ThemeProvider } from '@mui/material/styles';
import Routing from './routes/Routing';
import theme from './themes/theme';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Shop } from './types.ts';
import initStore from './store/store.ts';

function App({ shop }: { shop: Shop }) {
  return (
    <Provider store={initStore(shop)}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routing />
        </ThemeProvider>
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
