import { changeLineItemQuantityThunk, getCartThunk } from '@/store/slices/cart/thunks';
import { useAppDispatch, useAppSelector } from '@/store/store';
import theme from '@/themes/theme';
import { Cart } from '@commercetools/platform-sdk';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Paper,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Counter from '@/components/Counter/Counter';

const drawerWidth = '350px';
const centsPerEuro = 100;
const currency = '€';

function Basket() {
  const dispatch = useAppDispatch();

  const cart: Cart | null = useAppSelector((store) => store.cart.cart);

  // const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    dispatch(getCartThunk());
    // .unwrap()
    // .then((activeCart) => {
    //   setCart(activeCart);
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <Box>
      <Paper elevation={1} sx={{ display: 'flex', flexDirection: 'column', gap: 1, padding: 1 }}>
        <Button variant="contained" sx={{ alignSelf: 'center' }}>
          Checkout
        </Button>
        <Divider />
        <Box display="flex" justifyContent="space-between" alignItems="baseline">
          <Typography component={'h6'} variant="h6">
            Your cart:{' '}
          </Typography>
          <Typography
            color={theme.palette.grey[400]}
          >{`${cart?.totalLineItemQuantity || 0} ${cart?.totalLineItemQuantity === 1 ? 'product' : 'products'}`}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="baseline">
          <Typography component={'span'}>{`Products  (${cart?.totalLineItemQuantity || 0})`}</Typography>
          <Typography
            component={'h6'}
            variant="h6"
          >{`${(cart?.totalPrice.centAmount || 0) / centsPerEuro} ${currency}`}</Typography>
        </Box>
        {Boolean(cart?.discountOnTotalPrice) && (
          <Box display="flex" justifyContent="space-between" alignItems="baseline">
            <Typography component={'span'}>{`Discount`}</Typography>
            <Typography
              component={'h6'}
              variant="h6"
            >{`${(cart?.discountOnTotalPrice?.discountedAmount.centAmount || 0) / centsPerEuro} ${currency}`}</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
        <Button variant="text" color="primary" onClick={handleDrawerToggle} sx={{ mr: 2, display: { md: 'none' } }}>
          Checkout
        </Button>
        <Box>
          <List>
            {cart?.lineItems.map((product, i) => {
              return (
                <ListItem key={`${i}-cart-prod`}>
                  <ListItemAvatar sx={{ mr: 2 }}>
                    <Avatar
                      alt={product.name['en-GB']}
                      src={product.variant.images?.[0].url}
                      sx={{ width: '75px', height: '75px' }}
                    />
                  </ListItemAvatar>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
                    <Box>
                      <Typography fontWeight={600} fontSize={'1.3rem'}>
                        {product.name['en-GB']}
                      </Typography>
                      <Typography>
                        {product.variant.attributes?.map((attr) => {
                          return `${attr.name}: ${attr.value['label']}; `;
                        })}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'inherit',
                      }}
                    >
                      <Counter
                        quantity={product.quantity}
                        onDecreaseClick={() => {
                          const currentQuantity = product.quantity - 1;
                          dispatch(changeLineItemQuantityThunk({ id: product.productId, quantity: currentQuantity }));
                        }}
                        onIncreaseClick={() => {
                          const currentQuantity = product.quantity + 1;
                          dispatch(changeLineItemQuantityThunk({ id: product.productId, quantity: currentQuantity }));
                        }}
                        onValueChange={(val) => {
                          dispatch(changeLineItemQuantityThunk({ id: product.productId, quantity: val }));
                        }}
                      />
                      <Typography
                        sx={{
                          textDecoration: product.price.discounted ? 'line-through' : 'none',
                          fontSize: '1.2rem',
                          ml: 2.5,
                        }}
                      >{`${product.price.value.centAmount / centsPerEuro} ${currency}`}</Typography>
                      {Boolean(product.price.discounted) && (
                        <Typography
                          sx={{ color: theme.palette.primary.main, fontSize: '1.4rem', fontWeight: 600, ml: 1 }}
                        >
                          {`${(product.price.discounted?.value.centAmount || 0) / centsPerEuro} ${currency}`}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <IconButton sx={{ mr: 1.5 }}>
                    <DeleteOutlinedIcon />
                  </IconButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
      <Drawer
        variant="temporary"
        anchor="bottom"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 'auto', padding: '1.5rem' },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            zIndex: 1099,
            top: '73px',
            width: drawerWidth,
            maxHeight: 'calc(100% - 70px)',
            boxSizing: 'border-box',
            padding: '0 1.5rem 1.5rem 1.5rem',
            backgroundColor: 'transparent',
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Basket;
