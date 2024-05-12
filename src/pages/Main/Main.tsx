import styles from './Main.module.scss';
import { Container, Typography, Box, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Product } from '../../types';
import { ButtonLabels, InfoCardData, PageData } from './constants';
import Title from '../../components/Title/Title';
import ImageBg from '/images/home/home-bg.png';
import InfoCard from '../../components/InfoCard/InfoCard';
import { Paths } from '../../routes/routeConstants';
import { useNavigate } from 'react-router-dom';

// TODO set products data from CommerceTools and remove const products
const products: Product[] = [
  {
    label: 'Philodendron',
    imgPath: '/images/home/philodendron_1.png',
    description: 'A relatively fast-growing ornamental plant frequently used for indoor landscaping.',
  },
  {
    label: 'Philodendron',
    imgPath: '/images/home/philodendron_1.png',
    description: 'A relatively fast-growing ornamental plant frequently used for indoor landscaping.',
  },
  {
    label: 'Philodendron',
    imgPath: '/images/home/philodendron_1.png',
    description: 'A relatively fast-growing ornamental plant frequently used for indoor landscaping.',
  },
  {
    label: 'Philodendron',
    imgPath: '/images/home/philodendron_1.png',
    description: 'A relatively fast-growing ornamental plant frequently used for indoor landscaping.',
  },
  {
    label: 'Philodendron',
    imgPath: '/images/home/philodendron_1.png',
    description: 'A relatively fast-growing ornamental plant frequently used for indoor landscaping.',
  },
  {
    label: 'Philodendron',
    imgPath: '/images/home/philodendron_1.png',
    description: 'A relatively fast-growing ornamental plant frequently used for indoor landscaping.',
  },
];

function Main() {
  const navigate = useNavigate();

  const onRedirect = (url: string) => () => {
    navigate(url);
  };

  return (
    <Box className={styles.container}>
      <Box component="img" className={styles.imageBg} alt="Plant" src={ImageBg} />

      <Container maxWidth="md" className={styles.containerInner}>
        <Grid container>
          <Grid xs={12} md={8} mt={3}>
            <Typography variant="h1" pt={5} pb={2}>
              {PageData.TITLE_H1}
            </Typography>
            <Typography variant="body1">{PageData.SUBTEXT}</Typography>
            <Button size="small" sx={{ mt: 1, mr: 2 }} onClick={onRedirect(Paths.AUTH)}>
              {ButtonLabels.LOGIN}
            </Button>
            <Button size="small" sx={{ mt: 1 }} onClick={onRedirect(Paths.REGISTER)}>
              {ButtonLabels.REGISTRATION}
            </Button>
          </Grid>
          <Grid xs={12} md={4} mt={3}>
            <ProductCard product={products[0]} />
          </Grid>

          {/* PROMO Section */}
          <Grid xs={12} className={styles.sectionTitle}>
            <Title title={PageData.TITLE_PROMO} />
          </Grid>
          <Grid xs={12} mt={3}>
            <InfoCard data={InfoCardData} />
          </Grid>

          {/* DISCOUNT Section */}
          <Grid xs={12} className={styles.sectionTitle}>
            <Title title={PageData.TITLE_DISCOUNT} />
          </Grid>
          <Grid xs={12} mt={3}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {Array.from(Array(6)).map((_, index) => (
                  <Grid xs={4} sm={4} md={4} key={index}>
                    <ProductCard product={products[index]} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Main;
