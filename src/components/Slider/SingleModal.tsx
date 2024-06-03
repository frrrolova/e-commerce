import { Box, Dialog } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CloseIcon from '@mui/icons-material/Close';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { ReactElement } from 'react';

interface SlideModalProp {
  open: boolean;
  handleClose: () => void;
  isSlider: boolean;
  url?: string;
  label?: string | undefined;
  slides?: ReactElement[];
}

function SingleModal({ open, handleClose, url, label, isSlider, slides }: SlideModalProp) {
  // const boxPadding = isSlider ? 0 : 1;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="product-modal-title"
      aria-describedby="product-modal-description"
    >
      <Box
        sx={{
          // position: 'absolute',
          // top: '50%',
          // left: '50%',
          // transform: 'translate(-50%, -50%)',
          // width: {
          //   xs: '90%',
          //   sm: '85%',
          // },
          // maxWidth: {
          //   xs: '400px',
          //   sm: '600px',
          // },
          bgcolor: 'background.paper',
          // border: '2px solid gray',
          // boxShadow: 24,
          // p: boxPadding,
        }}
      >
        {isSlider && (
          <Carousel autoPlay showThumbs={false} showStatus={false}>
            {slides}
          </Carousel>
        )}
        <Box
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            cursor: 'pointer',
          }}
        >
          <CloseIcon />
        </Box>
        {!isSlider && (
          <CardMedia
            component="img"
            style={{
              width: '95%',
              height: '95%',
              objectFit: 'cover',
              padding: '30px',
            }}
            image={url}
            alt={label}
          />
        )}
      </Box>
    </Dialog>
  );
}

export default SingleModal;
