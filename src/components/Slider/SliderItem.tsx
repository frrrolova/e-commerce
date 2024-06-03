import { useState } from 'react';
import { Box } from '@mui/material';
import { Product } from '@/types';
import CardMedia from '@mui/material/CardMedia';
import SliderModal from './SliderModal';

interface SliderItemProp {
  product: Product;
  url: string;
  label: string | undefined;
  isSlider: boolean;
}

function SliderItem({ url, label, product, isSlider }: SliderItemProp) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if (open) return;
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const cursor = isSlider ? 'pointer' : 'auto';
  const hover = isSlider ? 'rgb(22, 45, 20)' : 'rgb(22, 35, 20)';
  return (
    <Box
      onClick={handleOpen}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgb(22, 35, 20)',
        border: '1px solid gray',
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08))',
        cursor: cursor,
        transition: 'all linear .5s',
        '&:hover': {
          background: hover,
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08))',
        },
      }}
    >
      {isSlider && <SliderModal open={open} handleClose={handleClose} product={product} />}
      <Box
        sx={{
          maxWidth: {
            xs: '250px',
            sm: '400px',
          },
          maxHeight: {
            xs: '250px',
            sm: '400px',
          },
          width: {
            xs: '250px',
            sm: '400px',
          },
          height: {
            xs: '250px',
            sm: '400px',
          },
        }}
      >
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
    </Box>
  );
}

export default SliderItem;
