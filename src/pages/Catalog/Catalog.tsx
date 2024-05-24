import styles from './Catalog.module.scss';
import { catalogService } from '@/services/catalogService';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography, Box, Container } from '@mui/material';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Product } from '@/types';

function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productData = await catalogService.fetchProducts();
        setProducts(productData);
        console.log(productData);
      } catch (err) {
        setError('Failed to fetch products');
        console.log('Failed to fetch products');
      } finally {
        console.log('Data is fetched');
      }
    };

    loadProducts();
  }, []);

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box className={styles.container}>
      <Container maxWidth="md" className={styles.containerInner}>
        <Grid xs={12} mt={3}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {products.map((product) => (
                <Grid xs={4} sm={4} md={4} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

export default Catalog;
