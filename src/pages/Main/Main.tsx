import styles from './Main.module.scss';
import { Container, Typography, Box, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Product } from '@/types';
import { ButtonLabels, InfoCardData, PageData } from './constants';
import Title from '@/components/Title/Title';
import ImageBg from '/images/home/home-bg.png';
import InfoCard from '@/components/InfoCard/InfoCard';
import { Paths } from '@/routes/routeConstants';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { catalogService } from '@/services/catalogService';

function Main() {
  const navigate = useNavigate();
  const [productTop, setProductTop] = useState<Product | null>(null);
  const [productsOffer, setProductsOffer] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onRedirect = (url: string) => () => {
    navigate(url);
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productData = await catalogService.fetchProductById(PageData.TOP_PLANT_ID);
        setProductTop(productData);

        const productsData = await catalogService.fetchProductsByCategory(PageData.CATEGORY_ID);
        setProductsOffer(productsData);
      } catch (err) {
        setError('Failed to fetch products');
        console.log('Failed to fetch products');
      } finally {
        console.log('Data is fetched');
      }
    };

    loadProducts();
  }, []);

  if (error || !productTop) return <Typography color="error">{error}</Typography>;

  return (
    <Box className={styles.container}>
      <Box
        component="img"
        className={styles.imageBg}
        sx={{ display: { xs: 'none', md: 'flex' } }}
        alt="Plant"
        src={ImageBg}
      />

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
            <ProductCard product={productTop} />
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
                {productsOffer.map((product) => (
                  <Grid xs={4} sm={4} md={4} key={product.id}>
                    <ProductCard product={product} />
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
