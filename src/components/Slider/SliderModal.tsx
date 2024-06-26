import { Product } from '@/types';
import SingleModal from './SingleModal';
import SliderItem from './SliderItem';
import { useMediaQuery } from '@mui/material';

interface SliderModalProp {
  product: Product;
  open: boolean;
  handleClose: () => void;
}

function SliderModal({ product, open, handleClose }: SliderModalProp) {
  const matchesBigScreen = useMediaQuery('(min-width:600px)');
  const matchesMidScreen = useMediaQuery('(min-width:400px)');

  if (product.images) {
    if (product.images.length > 1) {
      const slides = product.images.map((slide, index) => {
        return (
          <SliderItem
            isSlider={false}
            product={product}
            index={index}
            url={slide.url}
            label={slide.label}
            key={`modal-slider-${index}`}
            width={matchesBigScreen ? 500 : matchesMidScreen ? 330 : 280}
          />
        );
      });
      return (
        <SingleModal
          isSlider={true}
          open={open}
          handleClose={handleClose}
          slides={slides}
          size={matchesBigScreen ? 500 : matchesMidScreen ? 330 : 280}
        />
      );
    }
    return (
      <SingleModal
        isSlider={false}
        open={open}
        handleClose={handleClose}
        url={product.images[0].url}
        label={product.images[0].label}
        size={matchesBigScreen ? 500 : matchesMidScreen ? 330 : 280}
      />
    );
  }
}

export default SliderModal;
