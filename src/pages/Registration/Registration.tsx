import { Box, Container, Paper, Typography } from '@mui/material';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import backPlantImg from '/images/registration/reg-back.png';
import cornerPlantImg from '/images/registration/corner-plant1.png';

function Registration() {
  return (
    <>
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
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

            zIndex: -1,

            top: {
              xs: '20%',
              sm: 85,
            },
            left: 0,
            maxWidth: {
              xs: '90%',
              sm: 360,
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
              width: 155,
              zIndex: 2,
              top: -35,
              right: -47,
              display: {
                xs: 'none',
                sm: 'block',
              },
            }}
            alt="Plant"
            src={cornerPlantImg}
          />
          <Typography component="h1" variant="h5">
            Registration
          </Typography>
          <RegistrationForm />
        </Paper>
      </Container>
    </>
  );
}

export default Registration;
