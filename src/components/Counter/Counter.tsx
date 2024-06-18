import { Box, Paper, TextField, useMediaQuery } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import theme from '@/themes/theme';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';

interface CounterProps {
  quantity: number;
  onIncreaseClick: () => void;
  onDecreaseClick: () => void;
  onValueChange: (value: number) => void;
  isLoading?: boolean;
  disable: boolean;
}

function Counter({ quantity, onDecreaseClick, onIncreaseClick, onValueChange, isLoading }: CounterProps) {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  useEffect(() => {
    setCurrentQuantity(quantity);
  }, [quantity]);

  const matchesSmallScreen = useMediaQuery('(max-width:800px)');

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      border={'1px solid'}
      borderColor={theme.palette.divider}
      borderRadius={'7px'}
      padding={matchesSmallScreen ? '1px 0' : '3px 0'}
      fontSize={matchesSmallScreen ? '0.8rem' : '1rem'}
    >
      <LoadingButton
        size={matchesSmallScreen ? 'small' : 'medium'}
        startIcon={<RemoveIcon fontSize="inherit" />}
        disabled={!(quantity > 1)}
        loading={isLoading}
        onClick={() => {
          if (quantity > 1) {
            onDecreaseClick();
          }
        }}
        sx={{ borderRadius: '7px', minWidth: 'min-content', span: { padding: 0, m: 0, textAlign: 'center' } }}
      ></LoadingButton>
      <Paper>
        <TextField
          size="small"
          type="number"
          sx={{
            width: matchesSmallScreen ? '30px' : '50px',
            input: {
              textAlign: 'center',
              padding: matchesSmallScreen ? '2px' : '4px 5px',
              fontSize: matchesSmallScreen ? '0.8rem' : '1rem',
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
            if (value === 0) {
              setCurrentQuantity(1);
            }
          }}
        >
          {currentQuantity}
        </TextField>
      </Paper>
      <LoadingButton
        size={matchesSmallScreen ? 'small' : 'medium'}
        loading={isLoading}
        startIcon={<AddIcon fontSize="inherit" />}
        onClick={onIncreaseClick}
        sx={{ borderRadius: '7px', minWidth: 'min-content', span: { padding: 0, m: 0, textAlign: 'center' } }}
      ></LoadingButton>
    </Box>
  );
}

export default Counter;
