import './App.scss';
import { ThemeProvider } from '@mui/material/styles';
import Routing from './routes/Routing';
import theme from './themes/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routing />
    </ThemeProvider>
  );
}

export default App;
