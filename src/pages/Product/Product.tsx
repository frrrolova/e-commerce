import { useEffect, useState } from 'react';
import { ProductCard } from '@/types';
import { productService } from '@/services/productService';
import { Box, Typography, Button, Container, CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link as RouterLink } from 'react-router-dom';
import { Paths } from '@/routes/routeConstants';
import CardActions from '@mui/material/CardActions';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Product() {
  const [product, setProduct] = useState<ProductCard | null>(null);

  const loadProduct = async (productID: string) => {
    try {
      const productData = await productService.fetchProduct(productID);
      setProduct(productData);
      console.log(productData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProduct('8087c1a9-c10d-46b7-9b65-36ca70248e86');
  }, []);

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
                  xs: '40px',
                  sm: '20px',
                },
                paddingY: '15px',
              }}
            >
              <CardActionArea
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
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <ArrowBackIosNewIcon color="primary" onClick={() => alert('Back')} />
                  {product.images && (
                    <CardMedia
                      component="img"
                      sx={{
                        width: '80%',
                        height: '80%',
                        objectFit: 'cover',
                      }}
                      image={product.images[0].url}
                      alt={product.images[0].label}
                    />
                  )}
                  <ArrowForwardIosIcon color="primary" onClick={() => alert('Forward!')} />
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h2" component="div">
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
                      200$
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
                      300$
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
              </CardActionArea>
            </Card>
          </Container>
        </Box>
      </>
    );
  }
}

export default Product;
