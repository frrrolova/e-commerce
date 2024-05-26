import { useEffect, useState } from 'react';
import { Product as ProductType } from '@/types';
import { productService } from '@/services/productService';
import { Box, Typography, Button, Link, Container, CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link as RouterLink } from 'react-router-dom';
import { Paths } from '@/routes/routeConstants';
import CardActions from '@mui/material/CardActions';

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
    loadProduct('013f2c11-a4ec-47a6-93d6-a72f52776cd2');
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
                sm: '65px',
              },
            }}
          >
            <Card
              sx={{
                paddingX: '40px',
                paddingY: '15px',
              }}
            >
              <CardActionArea>
                {product.images && (
                  <CardMedia
                    component="img"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    image={product.images[0].url}
                    alt={product.images[0].label}
                  />
                )}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small">Buy now</Button>
                <Link component={RouterLink} to={Paths.CATALOG}>
                  Go back
                </Link>
              </CardActions>
            </Card>
          </Container>
        </Box>
      </>
    );
  }
}

export default Product;
