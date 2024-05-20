import styles from './ProductCard.module.scss';
import { Box, Paper, Typography } from '@mui/material';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Box className={styles.container}>
      <Paper elevation={3} className={styles.card}>
        <Box className={styles.content}>
          <Box component="img" className={styles.image} alt="Plant" src={product.imgPath} />
          <Box className={styles.description}>
            <Typography gutterBottom variant="h5" component="div" mt={1}>
              {product.label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
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
