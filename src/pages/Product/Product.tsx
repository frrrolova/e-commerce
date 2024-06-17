import { useEffect, useState } from 'react';
import { Product as ProductType } from '@/types';
import { productService } from '@/services/productService';
import { Box, Typography, Button, Container, Paper, useMediaQuery } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { useNavigate, useParams } from 'react-router-dom';
import { Paths } from '@/routes/routeConstants';
import CardActions from '@mui/material/CardActions';
import Slider from '@/components/Slider/Slider';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { addToCartThunk, changeLineItemQuantityThunk } from '@/store/slices/cart/thunks';
import { enqueueSnackbar } from 'notistack';
import { bottomSnackbarBasicParams } from '@/shared/snackbarConstans';
import { ErrorObject } from '@commercetools/platform-sdk';
import { centsInEuro, currency } from '@/core/commonConstants';
import theme from '@/themes/theme';

function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const matches = useMediaQuery('(min-width:1100px)');

  const productQuantity = useAppSelector(
    (state) => state.cart.cart?.lineItems.find((item) => item.productId === productId)?.quantity || 0,
  );

  const loadProduct = async () => {
    try {
      if (productId) {
        const productData = await productService.fetchProduct(productId);
        setProduct(productData);
      }
    } catch (err) {
      setError('Failed to fetch product details');
    }
  };

  useEffect(() => {
    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <div>{error}</div>;

  if (product) {
    return (
      <>
        <Box>
          <Container
            sx={{
              display: 'flex',
              paddingX: '5px',
              paddingY: {
                xs: '10px',
                md: '50px',
              },
              width: {
                xs: '95%',
                md: '85%',
              },
            }}
          >
            <Paper
              elevation={3}
              sx={{
                backgroundColor: 'transparent',
                paddingX: matches ? '50px' : '10px',
                paddingTop: matches ? '50px' : '30px',
                paddingBottom: matches ? '50px' : '5px',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: matches ? '30px' : '15px',
                  flexDirection: matches ? 'row' : 'column',
                }}
              >
                <Slider product={product} />
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: matches ? '14px' : '7px',
                    padding: {
                      xs: 1,
                      sm: 2,
                    },
                    paddingRight: matches ? 0 : 3,
                  }}
                >
                  <Box
                    sx={{
                      display: matches ? 'block' : 'flex',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h3"
                      component="div"
                      data-testid="product-name"
                      color={theme.palette.primary.contrastText}
                    >
                      {product.name}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                      }}
                    >
                      {product.prices![0].discounted ? (
                        <Typography
                          gutterBottom
                          variant="h4"
                          component="div"
                          sx={{
                            fontWeight: 'bold',
                            color: '#447A14',
                            textWrap: 'nowrap',
                          }}
                        >
                          {`${product.prices![0].discounted.value.centAmount / centsInEuro} ${currency}`}
                        </Typography>
                      ) : (
                        <Typography gutterBottom variant="h4" component="div" sx={{ textWrap: 'nowrap' }}>
                          {`${product.prices![0].value.centAmount / centsInEuro} ${currency}`}
                        </Typography>
                      )}
                      {product.prices![0].discounted && (
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="span"
                          color="text.secondary"
                          sx={{
                            display: 'inline',
                            textDecoration: 'line-through',
                            textWrap: 'nowrap',
                          }}
                        >
                          {product.prices![0].value.centAmount / centsInEuro} &euro;
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary" data-testid="product-description">
                    {product.description}
                  </Typography>
                  <CardActions
                    sx={{
                      paddingX: matches ? 1 : 0,
                      gap: 1,
                    }}
                  >
                    {productQuantity ? (
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ fontSize: { xs: '0.7rem', sm: '1rem' } }}
                        onClick={() => {
                          dispatch(changeLineItemQuantityThunk({ id: product.id, quantity: 0 }))
                            .then(() => {
                              enqueueSnackbar('Product removed from cart', {
                                variant: 'success',
                                ...bottomSnackbarBasicParams,
                              });
                            })
                            .catch((err: ErrorObject) => {
                              enqueueSnackbar(err.message, {
                                variant: 'error',
                                ...bottomSnackbarBasicParams,
                              });
                            });
                        }}
                      >
                        Remove from cart
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ fontSize: { xs: '0.7rem', sm: '1rem' } }}
                        onClick={() => {
                          dispatch(addToCartThunk(product.id))
                            .then(() => {
                              enqueueSnackbar('Product added to cart', {
                                variant: 'success',
                                ...bottomSnackbarBasicParams,
                              });
                            })
                            .catch((err: ErrorObject) => {
                              enqueueSnackbar(err.message, {
                                variant: 'error',
                                ...bottomSnackbarBasicParams,
                              });
                            });
                        }}
                      >
                        Buy now
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        navigate(Paths.CATALOG);
                      }}
                      sx={{ fontSize: { xs: '0.7rem', sm: '1rem' }, ml: '0 !important' }}
                    >
                      To catalog
                    </Button>
                  </CardActions>
                </CardContent>
              </Box>
            </Paper>
          </Container>
        </Box>
      </>
    );
  }
}

export default Product;
