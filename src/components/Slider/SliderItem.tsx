import { useState } from 'react';
import { Box } from '@mui/material';
import { Product } from '@/types';
import CardMedia from '@mui/material/CardMedia';
import SliderModal from './SliderModal';

interface SliderItemProp {
  product: Product;
  url: string;
  label: string | undefined;
  index?: number;
}

function SliderItem({ index, url, label, product }: SliderItemProp) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if (open) return;
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <Box
      onClick={handleOpen}
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
      <SliderModal open={open} handleClose={handleClose} product={product} />
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

export default SliderItem;
