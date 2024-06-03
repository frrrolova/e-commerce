import { useState } from 'react';
import { Box, Paper } from '@mui/material';
import { Product } from '@/types';
// import CardMedia from '@mui/material/CardMedia';
import SliderModal from './SliderModal';
// import { imageSizes } from './constants';

interface SliderItemProp {
  product: Product;
  url: string;
  label: string | undefined;
  width: number;
  isSlider: boolean;
  index?: number;
}

function SliderItem({ index, url, label, product, isSlider, width }: SliderItemProp) {
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
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background-color 0.3s ease-in-out',
        boxShadow: 'none',
        cursor: 'pointer',
        width: `${width}px`,
        minWidth: `${width}px`,
        height: `${width}px`,
        // height: {
        //   xs: imageSizes.smallHeight,
        //   sm: imageSizes.height,
        // },
        // minWidth: {
        //   xs: imageSizes.smallWidth,
        //   sm: imageSizes.width,
        // },
        padding: 1,
      }}
    >
      {isSlider && <SliderModal open={open} handleClose={handleClose} product={product} />}
      <Box
        component="img"
        sx={{
          objectFit: 'contain',
          width: `${width - 16}px`,
          height: `${width - 16}px`,
          flex: 1,
        }}
        src={url}
        alt={label}
      />
    </Paper>
  );
}

export default SliderItem;
