import { useEffect, useState } from 'react';
import { Product as ProductType } from '@/types';
import { productService } from '@/services/productService';
import { Box, Typography, Button, Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link as RouterLink } from 'react-router-dom';
import { Paths } from '@/routes/routeConstants';
import CardActions from '@mui/material/CardActions';
import Slider from '@/components/Slider/Slider';

//69ca9376-354e-4a8e-890c-a9e37ae95a59
//c28e093c-32e3-4e4f-9f93-527ed519ba20
//1e72e7c5-c166-4082-a342-33e35f11c5c0

function Product() {
  const [product, setProduct] = useState<ProductType | null>(null);

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
                    {product.prices![0].discounted ? (
                      <Typography
                        gutterBottom
                        variant="h4"
                        component="div"
                        sx={{
                          fontWeight: 'bold',
                          color: '#447A14',
                        }}
                      >
                        {product.prices![0].discounted.value.centAmount / 100}
                        &euro;
                      </Typography>
                    ) : (
                      <Typography gutterBottom variant="h4" component="div">
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
                        }}
                      >
                        {product.prices![0].value.centAmount / 100} &euro;
                      </Typography>
                    )}
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
