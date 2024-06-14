import '@/styles/styles.scss';
import styles from './ProductCard.module.scss';
import { Box, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { Product } from '@/types';
import Placeholder from '/images/catalog/placeholder_plant.webp';
import { addTooltip, centsInEuro } from './constants';
import { useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  // TODO add check: is product in the cart
  const [isAdded, setIsAdded] = useState(false);
  const currentIcon = isAdded ? <CheckOutlinedIcon /> : <AddShoppingCartIcon />;

  let price;
  let discountedPrice;
  if (product.prices) {
    price = product.prices[0].value.centAmount / centsInEuro;
    discountedPrice = product.prices[0].discounted && product.prices[0].discounted.value.centAmount / centsInEuro;
  }

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('in handleAddToCart');
    event.stopPropagation();
    setIsAdded(!isAdded);
  };

  return (
    <Box className={styles.container} onClick={handleClick}>
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
          </Box>
        </Box>
        <Box className={styles.bottomContent}>
          <Box className={styles.left}>
            {!!discountedPrice && (
              <Typography className={styles.discount} variant="body1" pr={1} mt={1} mr={1}>
                {discountedPrice} &euro;
              </Typography>
            )}
            <Typography className={discountedPrice !== undefined ? 'strikethrough' : ''} variant="body1" mt={1}>
              {price} &euro;
            </Typography>
          </Box>

          <Box className={styles.right}>
            {isAdded && (
              <Typography variant="h6" className={styles.inCart}>
                In Cart
              </Typography>
            )}

            <Tooltip title={addTooltip}>
              <IconButton
                disabled={isAdded}
                onClick={handleAddToCart}
                className={styles.customIconButton}
                size="large"
                sx={{ p: 0 }}
                aria-label="add"
              >
                {currentIcon}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default ProductCard;
