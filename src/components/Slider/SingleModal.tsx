import { Box, Modal } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CloseIcon from '@mui/icons-material/Close';
import { Product } from '@/types';

interface SlideModalProp {
  open: boolean;
  handleClose: () => void;
  url: string;
  label: string | undefined;
  product?: Product;
  index?: number;
}

function SingleModal({ open, handleClose, url, label }: SlideModalProp) {
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
          p: 1,
        }}
      >
        {/* <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
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
      </Box>
    </Modal>
  );
}

export default SingleModal;
