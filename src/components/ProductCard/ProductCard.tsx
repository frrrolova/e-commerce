import '@/styles/styles.scss';
import styles from './ProductCard.module.scss';
import { Box, Paper, Typography } from '@mui/material';
import { Product } from '@/types';
import Placeholder from '/images/catalog/placeholder_plant.png';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  let price;
  let discountedPrice;
  if (product.prices) {
    price = product.prices[0].value.centAmount / 100;
    discountedPrice = product.prices[0].discounted && product.prices[0].discounted.value.centAmount / 100;
  }
  return (
    <Box className={styles.container}>
      <Paper elevation={3} className={styles.card}>
        <Box className={styles.content}>
          <Box component="img" className={styles.image} alt="Plant" src={product.images?.[0].url || Placeholder} />
          <Box className={styles.description}>
            <Typography gutterBottom variant="h5" component="div" mt={1}>
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>

            <Box className={styles.bottomContent}>
              {!!discountedPrice && (
                <Typography className={styles.discount} variant="body1" pr={1} mt={1} mr={1}>
                  {discountedPrice} &euro;
                </Typography>
              )}
              <Typography className={discountedPrice !== undefined ? 'strikethrough' : ''} variant="body1" mt={1}>
                {price} &euro;
              </Typography>
            </Box>
            {/* TODO Add redirect to Product page*/}
            {/* <Button size="small" sx={{ mt: 1 }}>
              Buy Now
            </Button> */}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default ProductCard;
