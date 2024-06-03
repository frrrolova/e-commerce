import { Box, Modal } from '@mui/material';
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
  const boxPadding = isSlider ? 0 : 1;
  if (isSlider) {
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
            maxHeight: {
              xs: '400px',
              sm: '600px',
            },
            bgcolor: 'background.paper',
            border: '2px solid gray',
            boxShadow: 24,
            p: boxPadding,
          }}
        >
          <Carousel showThumbs={false} showStatus={false}>
            {slides}
          </Carousel>
          <Box
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              cursor: 'pointer',
              zIndex: '100',
            }}
          >
            <CloseIcon />
          </Box>
        </Box>
      </Modal>
    );
  } else {
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
              xs: '250px',
              sm: '400px',
            },
            height: {
              xs: '250px',
              sm: '400px',
            },
            maxWidth: {
              xs: '400px',
              sm: '600px',
            },
            maxHeight: {
              xs: '400px',
              sm: '600px',
            },
            bgcolor: 'background.paper',
            border: '2px solid gray',
            boxShadow: 24,
            p: boxPadding,
          }}
        >
          <Box
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: '100',
              cursor: 'pointer',
            }}
          >
            <CloseIcon />
          </Box>
          <CardMedia
            component="img"
            style={{
              width: '100%',
              height: '100%',
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'cover',
              padding: '10px',
            }}
            image={url}
            alt={label}
          />
        </Box>
      </Modal>
    );
  }
}

export default SingleModal;
