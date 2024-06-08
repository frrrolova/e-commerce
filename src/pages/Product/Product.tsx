import { useEffect, useState } from 'react';
import { Product as ProductType } from '@/types';
import { productService } from '@/services/productService';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Paths } from '@/routes/routeConstants';
import CardActions from '@mui/material/CardActions';
import Slider from '@/components/Slider/Slider';
import { addToCart } from '@/services/cartService';

//69ca9376-354e-4a8e-890c-a9e37ae95a59
//c28e093c-32e3-4e4f-9f93-527ed519ba20
//1e72e7c5-c166-4082-a342-33e35f11c5c0

function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [error, setError] = useState<string | null>(null);

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
                paddingX: {
                  xs: '10px',
                  md: '50px',
                },
                paddingTop: {
                  xs: '30px',
                  md: '50px',
                },
                paddingBottom: {
                  xs: '5px',
                  md: '50px',
                },
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  // alignItems: {
                  //   md: 'center',
                  // },
                  // justifyContent: 'center',
                  gap: {
                    xs: '15px',
                    md: '40px',
                  },
                  flexDirection: {
                    xs: 'column',
                    md: 'row',
                  },
                }}
              >
                <Slider product={product} />
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: {
                      xs: '7px',
                      md: '14px',
                    },
                    padding: {
                      xs: 3,
                      md: 2,
                    },
                    paddingRight: {
                      xs: 3,
                      md: 0,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: {
                        xs: 'flex',
                        md: 'block',
                      },
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Typography gutterBottom variant="h3" component="div">
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
                          {product.prices![0].discounted.value.centAmount / 100}
                          &euro;
                        </Typography>
                      ) : (
                        <Typography gutterBottom variant="h4" component="div" sx={{ textWrap: 'nowrap' }}>
                          {product.prices![0].value.centAmount / 100}
                          &euro;
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
                          {product.prices![0].value.centAmount / 100} &euro;
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <CardActions>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        addToCart(product.id).then((resp) => {
                          console.log(resp);
                        });
                      }}
                    >
                      Buy now
                    </Button>
                    <Button variant="outlined" size="small" component={RouterLink} to={Paths.CATALOG}>
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
