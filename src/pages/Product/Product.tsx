import { useEffect, useState } from 'react';
import { ProductCard } from '@/types';
import { productService } from '@/services/productService';
import { Box, Typography, Button, Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Paths } from '@/routes/routeConstants';
import CardActions from '@mui/material/CardActions';
import Slider from '@/components/Slider/Slider';

function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductCard | null>(null);
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
              justifyContent: 'center',
              alignItems: 'center',
              paddingX: '5px',
              paddingY: {
                xs: '30px',
                sm: '50px',
              },
            }}
          >
            <Card
              sx={{
                paddingX: {
                  xs: '30px',
                  sm: '20px',
                },
                paddingY: '15px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  flexDirection: {
                    xs: 'column',
                    sm: 'row',
                  },
                }}
              >
                <Slider product={product} />
                <CardContent>
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
                    <Typography gutterBottom variant="h4" component="div">
                      {product.prices![0].value.centAmount / 100} &euro;
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="span"
                      color="text.secondary"
                      sx={{
                        display: 'inline',
                        textDecoration: 'line-through',
                      }}
                    >
                      100 &euro;
                    </Typography>
                  </Box>
                  <CardActions>
                    <Button variant="outlined" size="small">
                      Buy now
                    </Button>
                    <Button variant="outlined" size="small" component={RouterLink} to={Paths.CATALOG}>
                      Go back
                    </Button>
                  </CardActions>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Container>
        </Box>
      </>
    );
  }
}

export default Product;
