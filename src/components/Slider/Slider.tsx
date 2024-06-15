import { Box, useMediaQuery } from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Product } from '@/types';
import SliderItem from './SliderItem';

interface ProductCardProp {
  product: Product;
}

function Slider({ product }: ProductCardProp) {
  const matchesBigScreen = useMediaQuery('(min-width:600px)');

  if (product.images) {
    if (product.images.length > 1) {
      const slides = product.images.map((slide, index) => {
        return (
          <SliderItem
            key={`product-slider-${index}`}
            isSlider={true}
            product={product}
            index={index}
            url={slide.url}
            label={slide.label}
            width={matchesBigScreen ? 350 : 280}
          />
        );
      });
      return (
        <Box
          sx={{
            width: matchesBigScreen ? 350 : 280,
            alignSelf: {
              xs: 'center',
            },
          }}
        >
          <Carousel showThumbs={false} showStatus={false} infiniteLoop={true} autoPlay={false}>
            {slides}
          </Carousel>
        </Box>
      );
    }
    return (
      <SliderItem
        isSlider={true}
        product={product}
        url={product.images[0].url}
        label={product.images[0].label}
        width={matchesBigScreen ? 350 : 280}
      />
    );
  }
}

export default Slider;
