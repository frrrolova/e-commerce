import { useState } from 'react';
import { Box, Paper } from '@mui/material';
import { Product } from '@/types';
// import CardMedia from '@mui/material/CardMedia';
import SliderModal from './SliderModal';
import { imageSizes } from './constants';

interface SliderItemProp {
  product: Product;
  url: string;
  label: string | undefined;
  isSlider: boolean;
  index?: number;
}

function SliderItem({ index, url, label, product, isSlider }: SliderItemProp) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if (open) return;
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <Paper
      elevation={3}
      onClick={handleOpen}
      key={index}
      sx={{
        overflow: 'hidden',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background-color 0.3s ease-in-out',
        boxShadow: 'none',
        cursor: 'pointer',
        // '&:hover': {
        //   backgroundColor: '#5257502e',
        // },
        width: {
          xs: imageSizes.smallWidth,
          sm: imageSizes.width,
        },
        height: {
          xs: imageSizes.smallHeight,
          sm: imageSizes.height,
        },
        minWidth: {
          xs: imageSizes.smallWidth,
          sm: imageSizes.width,
        },
        padding: 1,
      }}
    >
      {isSlider && <SliderModal open={open} handleClose={handleClose} product={product} />}
      <Box
        component="img"
        sx={{
          objectFit: 'contain',
          maxWidth: '330px',
          maxHeight: '330px',
          flex: 1,
        }}
        src={url}
        alt={label}
      />
    </Paper>
  );
}

export default SliderItem;
