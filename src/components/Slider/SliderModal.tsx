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
        return <SliderItem isSlider={false} product={product} index={index} url={slide.url} label={slide.label} />;
      });
      return <SingleModal isSlider={true} open={open} handleClose={handleClose} boxPadding={0} slides={slides} />;
    }
    return (
      <SingleModal
        isSlider={false}
        open={open}
        handleClose={handleClose}
        url={product.images[0].url}
        label={product.images[0].label}
        boxPadding={1}
      />
    );
  }
}

export default SliderModal;
