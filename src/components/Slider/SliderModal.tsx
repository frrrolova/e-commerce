import { Box, Modal } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CloseIcon from '@mui/icons-material/Close';
import { Product } from '@/types';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import SingleModal from './SingleModal';

interface SliderItemProp {
  url: string;
  label: string | undefined;
  index?: number;
}

interface SliderModalProp {
  product: Product;
  open: boolean;
  handleClose: () => void;
}

function SliderItem({ index, url, label }: SliderItemProp) {
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
        image={url}
        alt={label}
      />
    </Box>
  );
}

function SliderModal({ product, open, handleClose }: SliderModalProp) {
  if (product.images) {
    if (product.images.length > 1) {
      const slides = product.images.map((slide, index) => {
        return <SliderItem index={index} url={slide.url} label={slide.label} />;
      });
      return (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: {
                xs: '90%',
                sm: '85%',
              },
              maxWidth: {
                xs: '400px',
                sm: '600px',
              },
              bgcolor: 'background.paper',
              border: '2px solid gray',
              boxShadow: 24,
            }}
          >
            <Carousel autoPlay showThumbs={false} showStatus={false}>
              {slides}
            </Carousel>
            <Box
              onClick={handleClose}
              sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
              }}
            >
              <CloseIcon />
            </Box>
          </Box>
        </Modal>
      );
    }
    return (
      <SingleModal open={open} handleClose={handleClose} url={product.images[0].url} label={product.images[0].label} />
    );
  }
}

export default SliderModal;
