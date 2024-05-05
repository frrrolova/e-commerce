import { Button, Container, CssBaseline } from '@mui/material';
import './App.scss';
import Routing from './routes/Routing';

function App() {
  return (
    <>
      <CssBaseline />
      <Container>
        <h1>Plant shop</h1>
        <Button variant="outlined">Contained</Button>
        <Routing />
      </Container>
    </>
  );
}

export default App;
