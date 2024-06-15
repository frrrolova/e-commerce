import { changeLineItemQuantityThunk, clearCartThunk, getCartThunk } from '@/store/slices/cart/thunks';
import { useAppDispatch, useAppSelector } from '@/store/store';
import theme from '@/themes/theme';
import { Cart, ErrorObject, LineItem } from '@commercetools/platform-sdk';
import {
  Avatar,
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import Counter from '@/components/Counter/Counter';
import { enqueueSnackbar } from 'notistack';
import { bottomSnackbarBasicParams } from '@/shared/snackbarConstans';
import RemoveBtn from '@/components/RemoveBtn/RemoveBtn';
import { centsPerEuro, currency, drawerWidth } from './constants';
import BottomBar from '@/components/BottomBar/BottomBar';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@/routes/routeConstants';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function Basket() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cart: Cart | null = useAppSelector((store) => store.cart.cart);
  const isPending = useAppSelector((state) => state.cart.isQuantityChanging);
  const updatingProducts = useAppSelector((state) => state.cart.updatingProductIds);

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  useEffect(() => {
    dispatch(getCartThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemoveClick = (id: string) => {
    dispatch(changeLineItemQuantityThunk({ id, quantity: 0 }))
      .then(() => {
        enqueueSnackbar('Removed successfully', {
          variant: 'success',
          ...bottomSnackbarBasicParams,
        });
      })
      .catch((err: ErrorObject) => {
        enqueueSnackbar(err.message, {
          variant: 'error',
          ...bottomSnackbarBasicParams,
        });
      });
  };

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

  const isUpdatingProduct = useCallback(
    (productId: string) => {
      return isPending && updatingProducts.includes(productId);
    },
    [isPending, updatingProducts],
  );

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch(changeLineItemQuantityThunk({ id, quantity })).catch((err: ErrorObject) => {
      enqueueSnackbar(err.message, {
        variant: 'error',
        ...bottomSnackbarBasicParams,
      });
    });
  };

  const matchesBigScreen = useMediaQuery('(min-width:1100px)');
  const matchesSmallScreen = useMediaQuery('(max-width:700px)');
  const matchesPricesTextContent = useMediaQuery('(max-width:450px)');
  const matchesExtraSmallScreen = useMediaQuery('(max-width:350px)');

  const drawer = (
    <Box>
      <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', gap: 1, padding: 1 }}>
        <Button variant="contained" sx={{ alignSelf: 'center' }}>
          Confirm order
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

  const drawPrices = (product: LineItem) => {
    return (
      <>
        <Typography
          sx={{
            textDecoration: product.price.discounted ? 'line-through' : 'none',
            lineHeight: '1',
            fontSize: 'inherit',
          }}
        >{`${(product.price.value.centAmount / centsPerEuro) * product.quantity} ${currency}`}</Typography>
        {Boolean(product.price.discounted) && (
          <Typography
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 600,
              ml: 1,
              lineHeight: '1',
              fontSize: 'inherit',
            }}
          >
            {`${(product.totalPrice.centAmount || 0) / centsPerEuro} ${currency}`}
          </Typography>
        )}
      </>
    );
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, sm: 3 },
          width: matchesPricesTextContent ? `calc(100% - ${drawerWidth}px)` : 0,
        }}
      >
        <Typography
          component="h1"
          fontSize={matchesSmallScreen ? '1.4rem' : '1.6rem'}
          fontWeight={600}
          mb={2}
          pl={3}
          color={theme.palette.primary.contrastText}
        >
          Your Cart
        </Typography>
        {(!cart || !cart.lineItems.length) && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 7 }}>
            <Paper
              elevation={1}
              sx={{
                width: matchesExtraSmallScreen ? '90%' : matchesSmallScreen ? '75%' : '50%',
                padding: 2,
                textAlign: 'center',
              }}
            >
              <Typography fontSize="1.35rem" color={theme.palette.grey[400]}>
                There are no products in your cart yet
              </Typography>
              <Link
                color={theme.palette.primary.main}
                fontSize="1.2rem"
                fontWeight="600"
                sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}
                onClick={() => {
                  navigate(Paths.CATALOG);
                }}
              >
                Start shopping
                <AddShoppingCartIcon />
              </Link>
            </Paper>
          </Box>
        )}
        <List
          sx={{
            paddingX: { lg: 4 },
          }}
        >
          {cart?.lineItems.map((product, i) => {
            return (
              <ListItem
                key={`${i}-cart-prod`}
                sx={{
                  borderBottom: `1px dotted ${theme.palette.divider}`,
                  display: 'flex',
                  alignItems: 'stretch',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingX: { xs: 1, sm: 2 },
                  mb: {
                    xs: 1.5,
                    sm: 0,
                  },
                }}
              >
                <ListItemAvatar sx={{ mr: 3, alignSelf: 'center' }}>
                  <Avatar
                    alt={product.name['en-GB']}
                    src={product.variant.images?.[0].url}
                    sx={{
                      width: matchesExtraSmallScreen ? '75px' : { xs: '90px', md: '120px' },
                      height: matchesExtraSmallScreen ? '75px' : { xs: '90px', md: '120px' },
                    }}
                  />
                </ListItemAvatar>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                  sx={{
                    flexDirection: matchesSmallScreen ? 'column' : 'row',
                    alignItems: matchesSmallScreen ? 'flex-start' : 'center',
                  }}
                  gap={matchesSmallScreen ? 1.5 : 0}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '90%',
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: matchesExtraSmallScreen ? '1.1rem' : '1.3rem',
                          fontWeight: 600,
                          mb: 1,
                        }}
                      >
                        {product.name['en-GB']}
                      </Typography>
                      <Typography
                        color={theme.palette.grey[400]}
                        sx={{
                          fontSize: matchesPricesTextContent ? '0.8rem' : '1rem',
                          fontWeight: 600,
                        }}
                      >
                        {product.variant.attributes?.map((attr) => {
                          return `${attr.name}: ${attr.value['label']}; `;
                        })}
                      </Typography>
                      <Box display="flex" alignItems="baseline" color={theme.palette.grey[500]} fontSize={'0.8rem'}>
                        per item:&nbsp;
                        <Typography
                          sx={{
                            textDecoration: product.price.discounted ? 'line-through' : 'none',
                            fontSize: '0.8rem',
                          }}
                        >{`${product.price.value.centAmount / centsPerEuro} ${currency}`}</Typography>
                        {Boolean(product.price.discounted) && (
                          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, ml: 1 }}>
                            {`${(product.price.discounted?.value.centAmount || 0) / centsPerEuro} ${currency}`}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    gap="20px"
                    alignItems={matchesPricesTextContent ? 'flex-start' : 'center'}
                    flexDirection={matchesPricesTextContent ? 'column' : 'row'}
                  >
                    <Counter
                      quantity={product.quantity}
                      isLoading={isUpdatingProduct(product.productId)}
                      disable={false}
                      onDecreaseClick={() => {
                        const currentQuantity = product.quantity - 1;
                        handleQuantityChange(product.productId, currentQuantity);
                      }}
                      onIncreaseClick={() => {
                        const currentQuantity = product.quantity + 1;
                        handleQuantityChange(product.productId, currentQuantity);
                      }}
                      onValueChange={(val) => {
                        if (val > 0) {
                          handleQuantityChange(product.productId, val);
                        }
                      }}
                    />
                    <Box
                      alignItems="baseline"
                      whiteSpace="nowrap"
                      pr={1}
                      sx={{
                        display: matchesPricesTextContent ? 'flex' : 'none',
                      }}
                    >
                      {drawPrices(product)}
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    minWidth: { sm: '160px' },
                    minHeight: '100%',
                    ml: matchesSmallScreen ? 0 : 2.5,
                    fontSize: { xs: '1.1rem', sm: '1.4rem' },
                  }}
                >
                  <RemoveBtn
                    onClick={() => {
                      handleRemoveClick(product.productId);
                    }}
                  />
                  <Box
                    alignItems="baseline"
                    whiteSpace="nowrap"
                    pr={1}
                    sx={{
                      display: matchesPricesTextContent ? 'none' : 'flex',
                    }}
                  >
                    {drawPrices(product)}
                  </Box>
                </Box>
              </ListItem>
            );
          })}
        </List>
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
          display: matchesBigScreen ? 'none' : 'block',
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 'auto', padding: '1.5rem' },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          display: matchesBigScreen ? 'block' : 'none',
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
      {!matchesBigScreen && (
        <BottomBar isMatchMedia={matchesBigScreen} onClick={handleDrawerToggle}>
          <>
            <Typography sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>Checkout</Typography>
            <Typography>{`${(cart?.totalPrice.centAmount || 0) / centsPerEuro} ${currency}`}</Typography>
          </>
        </BottomBar>
      )}
      <ConfirmModal
        onClose={handleDialogClose}
        open={dialogOpen}
        onCancel={handleDialogClose}
        onConfirm={() => {
          handleDialogClose();
          if (cart) {
            dispatch(clearCartThunk({ id: cart?.id, version: cart?.version }));
          }
        }}
      >
        <>
          <DialogTitle color={theme.palette.primary.main} fontWeight={600}>
            Shopping cart cleaning
          </DialogTitle>
          <DialogContent sx={{ letterSpacing: '0.05em' }}>
            Are you sure you want to remove all items from your cart?
          </DialogContent>
        </>
      </ConfirmModal>
    </Box>
  );
}

export default Basket;
