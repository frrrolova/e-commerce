import { Box } from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Product } from '@/types';
import SliderItem from './SliderItem';
import Placeholder from '/images/catalog/placeholder_plant.png';

interface ProductCardProp {
  product: Product;
}

function Slider({ product }: ProductCardProp) {
  if (product.images) {
    if (product.images.length > 1) {
      const slides = product.images.map((slide, index) => {
        return (
          <SliderItem
            key={Date.now() + index + Math.random()}
            isSlider={true}
            product={product}
            url={slide.url}
            label={slide.label}
          />
        );
      });
      return (
        <Box
          sx={{
            maxWidth: {
              xs: '80%',
              sm: '50%',
            },
            flexBasis: '50%',
          }}
        >
          <Carousel showThumbs={false} showStatus={false}>
            {slides}
          </Carousel>
        </Box>
      );
    }
    return (
      <Box
        sx={{
          maxWidth: {
            xs: '80%',
            sm: '59%',
          },
          flexBasis: '50%',
        }}
      >
        <SliderItem isSlider={true} product={product} url={product.images[0].url} label={product.images[0].label} />
      </Box>
    );
  } else {
    return <SliderItem isSlider={false} product={product} url={Placeholder} label={'Plant'} />;
  }
}

export default Slider;
