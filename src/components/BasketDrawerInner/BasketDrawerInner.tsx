import { useAppSelector } from '@/store/store';
import theme from '@/themes/theme';
import { Cart } from '@commercetools/platform-sdk';
import { Box, Button, Divider, InputBase, Paper, Typography, useMediaQuery } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useFormik } from 'formik';
import { centsInEuro, currency } from '@/core/commonConstants';

interface BasketDrawerInnerProps {
  cart: Cart | null;
  onPromoRemove: () => void;
  handleDialogOpen: () => void;
  onPromoApply: ({ promo }: { promo: string }) => void;
}

export function BasketDrawerInner({ cart, onPromoRemove, handleDialogOpen, onPromoApply }: BasketDrawerInnerProps) {
  const totalPrice: number = (cart?.totalPrice.centAmount || 0) / centsInEuro;
  const discountedAmount: number = (cart?.discountOnTotalPrice?.discountedAmount.centAmount || 0) / centsInEuro;
  const priceWithoutDiscount: number = totalPrice + discountedAmount;

  const promo: string = useAppSelector((store) => store.cart.promo);

  const matchesBigScreen = useMediaQuery('(min-width:1100px)');
  const matchesExtraSmallScreen = useMediaQuery('(max-width:350px)');

  const formik = useFormik({
    initialValues: {
      promo: '',
    },
    onSubmit: (values) => {
      onPromoApply(values);
    },
  });

  return (
    <Box>
      <Paper elevation={1} sx={{ display: 'flex', flexDirection: 'column', gap: 1, padding: 1 }}>
        <Button
          variant="contained"
          sx={{ alignSelf: 'center' }}
          disabled={!(Boolean(cart) && Boolean(cart?.lineItems.length))}
        >
          Confirm order
        </Button>
        <Divider />
        <Box display="flex" justifyContent="space-between" alignItems="baseline">
          <Typography component={'h6'} variant="h6" fontWeight={600}>
            Your cart:{' '}
          </Typography>
          <Typography
            color={theme.palette.grey[400]}
          >{`${cart?.totalLineItemQuantity || 0} ${cart?.totalLineItemQuantity === 1 ? 'product' : 'products'}`}</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="baseline"
          color={theme.palette.primary.main}
          fontWeight={600}
        >
          <Typography fontSize="1.15rem">Total price</Typography>
          <Typography fontSize="1.25rem" fontWeight={600}>{`${totalPrice} ${currency}`}</Typography>
        </Box>
        {Boolean(cart?.discountOnTotalPrice) && (
          <>
            <Box display="flex" justifyContent="space-between" alignItems="baseline" color={theme.palette.grey[600]}>
              <Typography fontSize="0.95rem">Price without discount</Typography>
              <Typography fontSize="1.05rem">{`${priceWithoutDiscount} ${currency}`}</Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="baseline"
              color={theme.palette.primary.contrastText}
            >
              <Typography fontSize="1.15rem">Discount with promo</Typography>
              <Typography fontSize="1.25rem">{`${discountedAmount} ${currency}`}</Typography>
            </Box>
          </>
        )}
        <Divider />
        {Boolean(promo) && (
          <Box
            sx={{
              color: theme.palette.primary.contrastText,
              display: matchesBigScreen ? 'block' : { xs: 'block', sm: 'flex' },
              alignItems: 'flex-end',
              gap: 5,
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '1.05rem',
                textAlign: 'center',
                mb: matchesBigScreen ? 1 : { xs: 1, sm: 0 },
              }}
            >
              Applied promo
            </Typography>
            <Paper
              elevation={5}
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <InputBase
                fullWidth
                disabled
                value={promo}
                sx={{
                  ml: 1,
                  flex: 1,
                  input: {
                    textTransform: 'uppercase',
                    fontSize: matchesExtraSmallScreen ? '0.8rem' : '1rem',
                  },
                }}
                inputProps={{ 'aria-label': 'Applied promo code' }}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <Button color="error" sx={{ p: '10px' }} aria-label="directions" disabled={!cart} onClick={onPromoRemove}>
                Remove
              </Button>
            </Paper>
          </Box>
        )}
        {!promo && (
          <Box
            sx={{
              color: theme.palette.primary.contrastText,
              display: matchesBigScreen ? 'block' : { xs: 'block', sm: 'flex' },
              alignItems: 'flex-end',
              gap: 5,
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '1.05rem',
                textAlign: 'center',
                mb: matchesBigScreen ? 1 : { xs: 1, sm: 0 },
              }}
            >
              Have a promo code?
            </Typography>
            <Paper
              component="form"
              elevation={5}
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                flex: 1,
              }}
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit(e);
              }}
            >
              <InputBase
                name="promo"
                value={formik.values.promo}
                fullWidth
                sx={{
                  ml: 1,
                  flex: 1,
                  input: { fontSize: matchesExtraSmallScreen ? '0.8rem' : '1rem' },
                }}
                placeholder="Enter promo code"
                inputProps={{ 'aria-label': 'Enter promo code' }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <Button
                color="primary"
                sx={{ p: '10px' }}
                aria-label="directions"
                type="submit"
                disabled={!(Boolean(cart) && Boolean(cart?.lineItems.length))}
              >
                Apply
              </Button>
            </Paper>
          </Box>
        )}
        <Button
          variant="outlined"
          disabled={!(Boolean(cart) && Boolean(cart?.lineItems.length))}
          endIcon={<DeleteOutlinedIcon />}
          onClick={handleDialogOpen}
        >
          Clear cart
        </Button>
      </Paper>
    </Box>
  );
}

export default BasketDrawerInner;
