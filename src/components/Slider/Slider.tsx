import { Box } from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Product } from '@/types';
import SliderItem from './SliderItem';
import { imageSizes } from './constants';

interface ProductCardProp {
  product: Product;
}

function Slider({ product }: ProductCardProp) {
  if (product.images) {
    if (product.images.length > 1) {
      const slides = product.images.map((slide, index) => {
        console.log(index, Math.random());
        return (
          <SliderItem
            key={`product-slider-${index}`}
            isSlider={true}
            product={product}
            index={index}
            url={slide.url}
            label={slide.label}
          />
        );
      });
      return (
        <Box
          sx={{
            width: {
              xs: imageSizes.smallWidth,
              sm: imageSizes.width,
            },
            alignSelf: {
              xs: 'center',
            },
          }}
        >
          <Carousel showThumbs={false} showStatus={false} infiniteLoop={true}>
            {slides}
          </Carousel>
        </Box>
      );
    }
    return <SliderItem isSlider={true} product={product} url={product.images[0].url} label={product.images[0].label} />;
  }
}

export default Slider;
