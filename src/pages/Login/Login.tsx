import { Box, Container, Paper, Typography } from '@mui/material';
import backPlantImg from '/images/registration/reg-back.png';
import cornerPlantImg from '/images/registration/corner-plant.png';
import LoginForm from '../../components/LoginForm/LoginForm';

function Login() {
  return (
    <>
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          component="img"
          sx={{
            position: 'absolute',
            width: 360,
            zIndex: -1,
            top: 60,
            left: 0,
          }}
          alt="Ficus"
          src={backPlantImg}
        />
        <Paper
          elevation={2}
          sx={{
            position: 'relative',
            zIndex: 1,
            marginTop: 5,
            paddingY: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: 0.9,
            width: {
              xs: '90%',
              md: '70%',
            },
          }}
        >
          <Box
            component="img"
            sx={{
              position: 'absolute',
              width: 170,
              zIndex: 2,
              top: -35,
              right: -42,
            }}
            alt="Plant"
            src={cornerPlantImg}
          />
          <Typography component="h1" variant="h5">
            Log IN
          </Typography>
          <LoginForm />
        </Paper>
      </Container>
    </>
  );
}

export default Login;
