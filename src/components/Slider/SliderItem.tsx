import { useState } from 'react';
import { Box, Paper } from '@mui/material';
import { Product } from '@/types';
// import CardMedia from '@mui/material/CardMedia';
import SliderModal from './SliderModal';

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
  // const cursor = isSlider ? 'pointer' : 'auto';
  // const hover = isSlider ? 'rgb(22, 45, 20)' : 'rgb(22, 35, 20)';
  return (
    <Paper
      elevation={3}
      onClick={handleOpen}
      key={index}
      sx={{
        // position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background-color 0.3s ease-in-out',
        // background: 'rgb(22, 35, 20)',
        // border: '1px solid gray',
        // backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08))',
        cursor: 'pointer',
        // transition: 'all linear .5s',
        '&:hover': {
          backgroundColor: '#323d2d',
        },
        width: '350px',
        height: '350px',
        minWidth: '350px',
        padding: 1,
      }}
    >
      {isSlider && <SliderModal open={open} handleClose={handleClose} product={product} />}
      <Box
        component="img"
        sx={{
          // position: 'absolute',
          // width: '80%',
          // height: '80%',
          objectFit: 'contain',
          // padding: '30px',
          // bottom: '-20px',
          // maxHeight: '100%',
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
