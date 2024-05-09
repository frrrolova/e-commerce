import './App.scss';
import { ThemeProvider } from '@mui/material/styles';
import Routing from './routes/Routing';
import theme from './themes/theme';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import initStore from './store/store.ts';
import { Project } from '@commercetools/platform-sdk';

function App({ project }: { project: Project }) {
  return (
    <Provider store={initStore(project)}>
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
