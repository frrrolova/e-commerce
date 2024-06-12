import { Box, IconButton, Paper, TextField } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import theme from '@/themes/theme';
import { useEffect, useState } from 'react';

interface CounterProps {
  quantity: number;
  onIncreaseClick: () => void;
  onDecreaseClick: () => void;
  onValueChange: (value: number) => void;
}

function Counter({ quantity, onDecreaseClick, onIncreaseClick, onValueChange }: CounterProps) {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  useEffect(() => {
    setCurrentQuantity(quantity);
  }, [quantity]);

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      border={'1px solid'}
      borderColor={theme.palette.divider}
      borderRadius={'7px'}
    >
      <IconButton
        disabled={!(quantity > 1)}
        onClick={() => {
          if (quantity > 1) {
            onDecreaseClick();
          }
        }}
        sx={{ borderRadius: '7px' }}
      >
        <RemoveIcon />
      </IconButton>
      <Paper>
        <TextField
          size="small"
          type="number"
          sx={{
            width: '50px',
            input: {
              textAlign: 'center',
              padding: '4px 5px',
            },
            'input::-webkit-outer-spin-button': {
              WebkitAppearance: 'none',
            },
            'input::-webkit-inner-spin-button': {
              WebkitAppearance: 'none',
            },
          }}
          value={`${currentQuantity}`}
          onChange={(e) => {
            setCurrentQuantity(+e.target.value);
          }}
          onBlur={(e) => {
            const value = +e.target.value;
            onValueChange(value);
          }}
        >
          {currentQuantity}
        </TextField>
      </Paper>
      <IconButton onClick={onIncreaseClick} sx={{ borderRadius: '7px' }}>
        <AddIcon />
      </IconButton>
    </Box>
  );
}

export default Counter;
