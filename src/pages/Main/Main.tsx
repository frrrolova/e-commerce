import styles from './Main.module.scss';
import { Container, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import ProductCard from '@/components/ProductCard/ProductCard';
import { InfoDataCard, Product } from '@/types';
import { InfoCardBtn, PageData, offersOnPage } from './constants';
import Title from '@/components/Title/Title';
import ImageBg from '/images/home/home-bg.webp';
import InfoCard from '@/components/InfoCard/InfoCard';
import { useState, useEffect } from 'react';
import { catalogService } from '@/services/catalogService';
import { promoService } from '@/services/promoService';

function Main() {
  const [productTop, setProductTop] = useState<Product | null>(null);
  const [productsOffer, setProductsOffer] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [promoData, setPromoData] = useState<InfoDataCard[]>([]);

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
      }
    };

    const loadPromo = async () => {
      try {
        const resp = await promoService.fetchPromoCodes();
        setPromoData(resp);
      } catch (err) {
        setError('Failed to fetch PromoCodes');
        console.log('Failed to fetch PromoCodes');
      }
    };

    loadProducts();

    loadPromo();
  }, []);

  if (error || !productTop)
    return (
      <Typography
        color="error"
        sx={{
          position: 'absolute',
          top: '50vh',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
        }}
      >
        {error}
      </Typography>
    );

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
          </Grid>
          <Grid xs={12} md={4} mt={3}>
            <ProductCard product={productTop} />
          </Grid>

          <Grid xs={12} className={styles.sectionTitle}>
            <Title title={PageData.TITLE_PROMO} />
          </Grid>
          {!!promoData.length &&
            promoData.map((promo, index) => (
              <Grid xs={12} mt={5} key={`card-${index}`}>
                <InfoCard data={promo} button={InfoCardBtn} imageRight={index % 2 !== 0} />
              </Grid>
            ))}

          {/* DISCOUNT Section */}
          <Grid xs={12} className={styles.sectionTitle}>
            <Title title={PageData.TITLE_DISCOUNT} />
          </Grid>
          <Grid xs={12} mt={3}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {productsOffer.slice(0, offersOnPage).map((product) => (
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
