import { Box, Dialog, useMediaQuery } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CloseIcon from '@mui/icons-material/Close';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { ReactElement } from 'react';
import styles from './Slider.module.scss';

interface SlideModalProp {
  open: boolean;
  handleClose: () => void;
  isSlider: boolean;
  url?: string;
  label?: string | undefined;
  slides?: ReactElement[];
  size: number;
}

function SingleModal({ open, handleClose, url, label, isSlider, slides, size }: SlideModalProp) {
  const matchesBigScreen = useMediaQuery('(min-width:600px)');
  const matchesMidScreen = useMediaQuery('(min-width:400px)');

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="product-modal-title"
      aria-describedby="product-modal-description"
      slotProps={{
        root: {
          className: styles.test,
        },
      }}
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          margin: 0,
        }}
      >
        {isSlider && (
          <Carousel showThumbs={false} showStatus={false} infiniteLoop={true} autoPlay={false} width={size}>
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
            zIndex: 100,
          }}
        >
          <CloseIcon />
        </Box>
        {!isSlider && (
          <CardMedia
            component="img"
            style={{
              width: matchesBigScreen ? '500px' : matchesMidScreen ? '330px' : '280px',
              height: matchesBigScreen ? '500px' : matchesMidScreen ? '330px' : '280px',
              objectFit: 'contain',
              padding: 1,
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
