import '@/styles/styles.scss';
import styles from './ProductCard.module.scss';
import { Box, CircularProgress, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { Product } from '@/types';
import Placeholder from '/images/catalog/placeholder_plant.webp';
import { PageData, centsInEuro } from './constants';
import { useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { addToCartThunk } from '@/store/slices/cart/thunks';
import { enqueueSnackbar } from 'notistack';
import { bottomSnackbarBasicParams } from '@/shared/snackbarConstans';
import { ErrorObject } from '@commercetools/platform-sdk';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const productQuantity = useAppSelector(
    (state) => state.cart.cart?.lineItems.find((item) => item.productId === product.id)?.quantity || 0,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(productQuantity > 0 ? true : false);
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
    event.stopPropagation();
    setIsAdded(!isAdded);
    setIsLoading(true);

    dispatch(addToCartThunk(product.id))
      .then(() => {
        enqueueSnackbar(PageData.addSnackbar, {
          variant: 'success',
          ...bottomSnackbarBasicParams,
        });
      })
      .catch((err: ErrorObject) => {
        enqueueSnackbar(err.message, {
          variant: 'error',
          ...bottomSnackbarBasicParams,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Box className={styles.container} onClick={handleClick}>
      <Paper elevation={3} className={styles.card}>
        <Box className={styles.content}>
          <Box
            component="img"
            className={styles.image}
            alt="Plant"
            src={product.images?.[0]?.url || Placeholder}
            loading="lazy"
          />
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
              <Typography className={styles.discount} variant="body1" pr={1} mr={1}>
                {discountedPrice} &euro;
              </Typography>
            )}
            <Typography className={discountedPrice !== undefined ? 'strikethrough' : ''} variant="body1">
              {price} &euro;
            </Typography>
          </Box>

          <Box className={styles.right}>
            {isLoading === true ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress sx={{ padding: '0.5rem' }} />
              </Box>
            ) : (
              <>
                {isAdded && (
                  <Typography variant="h6" className={styles.inCart}>
                    In Cart
                  </Typography>
                )}

                <Tooltip title={isAdded ? '' : PageData.addTooltip}>
                  <span>
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
                  </span>
                </Tooltip>
              </>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default ProductCard;
