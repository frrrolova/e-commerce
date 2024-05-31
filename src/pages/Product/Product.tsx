import { useEffect, useState } from 'react';
import { ProductCard } from '@/types';
import { productService } from '@/services/productService';
import { Box, Typography, Button, Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link as RouterLink } from 'react-router-dom';
import { Paths } from '@/routes/routeConstants';
import CardActions from '@mui/material/CardActions';
import Slider from '@/components/Slider/Slider';

function Product() {
  const [product, setProduct] = useState<ProductCard | null>(null);
  // const [price, setPrice] = useState(0);
  // const [discount, setDiscount] = useState(0);

  const loadProduct = async (productID: string) => {
    try {
      const productData = await productService.fetchProduct(productID);
      setProduct(productData);
      // if (product) {
      //   setPrice(product.prices![0].value.centAmount / 100);
      //   if (product.prices![0].discounted) {
      //     setDiscount(product.prices![0].discounted.value.centAmount / 100);
      //   }
      // }
      console.log(productData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProduct('69ca9376-354e-4a8e-890c-a9e37ae95a59');
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
