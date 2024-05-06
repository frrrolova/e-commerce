import './App.scss';
import { ThemeProvider } from '@mui/material/styles';
import Routing from './routes/Routing';
import theme from './themes/theme';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routing />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
