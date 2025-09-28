import { Box, Container, Paper, Typography } from '@mui/material';
import backPlantImg from '/images/registration/reg-back.webp';
import LoginForm from '../../components/LoginForm/LoginForm';

function Login() {
  return (
    <>
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          paddingX: '3px',
          paddingY: {
            xs: '30px',
            sm: '68px',
          },
        }}
      >
        <Box
          component="img"
          sx={{
            position: 'absolute',
            width: 360,
            zIndex: -1,
            top: 80,
            left: {
              xs: -135,
              sm: 40,
            },
            opacity: {
              xs: 0.7,
              md: 1,
            },
          }}
          alt="Ficus"
          src={backPlantImg}
        />
        <Paper
          elevation={2}
          sx={{
            position: 'relative',
            zIndex: 1,
            paddingY: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: 0.9,
            width: {
              xs: '90%',
              sm: '75%',
              md: '50%',
            },
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <LoginForm />
        </Paper>
      </Container>
    </>
  );
}

export default Login;
