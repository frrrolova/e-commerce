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
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

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
  // const loadProduct = useCallback(
  //   async (productID: string) => {
  //     try {
  //       const productData = await productService.fetchProduct(productID);
  //       setProduct(productData);
  //       if (product) {
  //         setPrice(product.prices![0].value.centAmount / 100);
  //         if (product.prices![0].discounted) {
  //           setDiscount(product.prices![0].discounted.value.centAmount / 100);
  //         }
  //       }
  //       console.log(productData);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   },
  //   [product],
  // );

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
                <Carousel autoPlay showThumbs={false}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <CardMedia
                      component="img"
                      style={{ width: '70%', height: '70%', objectFit: 'cover' }}
                      image={product.images![0].url}
                      alt={product.images![0].label}
                    />
                    {/* <Typography color="text.primary" className="legend" component="p">
                      {product.images![0].label}
                    </Typography> */}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <CardMedia
                      component="img"
                      style={{ width: '70%', height: '70%', objectFit: 'cover' }}
                      image={product.images![1].url}
                      alt={product.images![1].label}
                    />
                    {/* <Typography component="p" className="legend">
                      {product.images![1].label}
                    </Typography> */}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <CardMedia
                      component="img"
                      style={{ width: '70%', height: '70%', objectFit: 'cover' }}
                      image={product.images![2].url}
                      alt={product.images![2].label}
                    />
                    {/* <Typography component="p" className="legend">
                      {product.images![2].label}
                    </Typography> */}
                  </Box>
                </Carousel>
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
                      {product.prices![0].discounted && product.prices![0].discounted.value.centAmount / 100} &euro;
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
