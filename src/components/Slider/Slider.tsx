import { Box } from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Product } from '@/types';
import SliderItem from './SliderItem';

interface ProductCardProp {
  product: Product;
}

function Slider({ product }: ProductCardProp) {
  if (product.images) {
    if (product.images.length > 1) {
      const slides = product.images.map((slide, index) => {
        return <SliderItem isSlider={true} product={product} index={index} url={slide.url} label={slide.label} />;
      });
      return (
        <Box
          sx={{
            // maxWidth: {
            //   xs: '90%',
            //   sm: '60%',
            // },
            width: '355px',
            // display: 'flex',
            // justifyContent: 'center',
          }}
        >
          <Carousel showThumbs={false} showStatus={false}>
            {slides}
          </Carousel>
        </Box>
      );
    }
    return <SliderItem isSlider={true} product={product} url={product.images[0].url} label={product.images[0].label} />;
  }
}

export default Slider;
