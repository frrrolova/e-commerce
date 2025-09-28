import { Container, Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { InfoCardBtn, InfoCardData } from './constants';
import InfoCard from '@/components/InfoCard/InfoCard';

function PageNotFound() {
  return (
    <Box>
      <Container maxWidth="md">
        <Grid container>
          <Grid xs={12} mt={3}>
            <InfoCard data={InfoCardData} button={InfoCardBtn} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default PageNotFound;
