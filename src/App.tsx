import { Container, CssBaseline } from '@mui/material';
import './App.scss';
import Routing from './routes/Routing';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <Container>
          <Routing />
        </Container>
      </LocalizationProvider>
    </>
  );
}

export default App;
