import { Container, Box, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { ButtonLabels, InfoCardData } from './constants';
import { Paths } from '@/routes/routeConstants';
import { useNavigate } from 'react-router-dom';
import InfoCard from '@/components/InfoCard/InfoCard';

function PageNotFound() {
  const navigate = useNavigate();

  const onRedirect = (url: string) => () => {
    navigate(url);
  };

  const ButtonHome = () => {
    return (
      <Button onClick={onRedirect(Paths.HOME)} size="small" sx={{ mt: 1, mr: 2 }} variant="contained">
        {ButtonLabels.HOME}
      </Button>
    );
  };

  return (
    <Box>
      <Container maxWidth="md">
        <Grid container>
          <Grid xs={12} mt={3}>
            <InfoCard data={InfoCardData} button={<ButtonHome />} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default PageNotFound;
