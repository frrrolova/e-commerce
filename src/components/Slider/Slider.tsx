import { Box } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { ProductCard } from '@/types';

interface ProductCardProp {
  product: ProductCard;
}

function Slider({ product }: ProductCardProp) {
  if (product.images) {
    if (product.images.length > 1) {
      const slides = product.images.map((slide, index) => {
        return (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'rgb(22, 35, 20)',
              border: '1px solid gray',
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08))',
            }}
          >
            <CardMedia
              component="img"
              style={{
                width: '80%',
                height: '80%',
                objectFit: 'cover',
                padding: '30px',
              }}
              image={slide.url}
              alt={slide.label}
            />
          </Box>
        );
      });
      return (
        <Box
          sx={{
            maxWidth: {
              xs: '90%',
              sm: '60%',
            },
          }}
        >
          <Carousel autoPlay showThumbs={false} showStatus={false}>
            {slides}
          </Carousel>
        </Box>
      );
    }
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgb(22, 35, 20)',
          border: '1px solid gray',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08))',
        }}
      >
        <CardMedia
          component="img"
          style={{
            width: '80%',
            height: '80%',
            objectFit: 'cover',
          }}
          image={product.images[0].url}
          alt={product.images[0].label}
        />
      </Box>
    );
  }
}

export default Slider;
