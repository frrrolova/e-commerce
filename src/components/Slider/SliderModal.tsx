import { Product } from '@/types';
import SingleModal from './SingleModal';
import SliderItem from './SliderItem';

interface SliderModalProp {
  product: Product;
  open: boolean;
  handleClose: () => void;
}

function SliderModal({ product, open, handleClose }: SliderModalProp) {
  if (product.images) {
    if (product.images.length > 1) {
      const slides = product.images.map((slide, index) => {
        return <SliderItem key={index} isSlider={false} product={product} url={slide.url} label={slide.label} />;
      });
      return <SingleModal isSlider={true} open={open} handleClose={handleClose} slides={slides} />;
    }
    return (
      <SingleModal
        isSlider={false}
        open={open}
        handleClose={handleClose}
        url={product.images[0].url}
        label={product.images[0].label}
      />
    );
  }
}

export default SliderModal;
