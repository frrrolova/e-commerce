/* eslint-disable react-hooks/exhaustive-deps */
import {
  addPromoThunk,
  changeLineItemQuantityThunk,
  clearCartThunk,
  getActivePromoThunk,
  getCartThunk,
  removePromoThunk,
} from '@/store/slices/cart/thunks';
import { useAppDispatch, useAppSelector } from '@/store/store';
import theme from '@/themes/theme';
import { Cart, ErrorObject } from '@commercetools/platform-sdk';
import { Box, DialogContent, DialogTitle, Drawer, List, Typography, useMediaQuery } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { bottomSnackbarBasicParams, topSnackbarBasicParams } from '@/shared/snackbarConstans';
import { drawerWidth } from './constants';
import BottomBar from '@/components/BottomBar/BottomBar';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';
import BasketDrawerInner from '@/components/BasketDrawerInner/BasketDrawerInner';
import BasketProduct from '@/components/BasketProduct/BasketProduct';
import { centsInEuro, currency } from '@/core/commonConstants';
import { BasketRespResultMessages } from '@/enums/basketRespResults.enum';

function Basket() {
  const dispatch = useAppDispatch();

  const cart: Cart | null = useAppSelector((store) => store.cart.cart);
  const isPending = useAppSelector((state) => state.cart.isQuantityChanging);
  const updatingProducts = useAppSelector((state) => state.cart.updatingProductIds);
  const discountCodes = useAppSelector((store) => store.cart.cart?.discountCodes);

  const totalPrice: number = (cart?.totalPrice.centAmount || 0) / centsInEuro;

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    dispatch(getCartThunk());
  }, []);

  useEffect(() => {
    if (discountCodes?.length) {
      dispatch(getActivePromoThunk(discountCodes[0].discountCode.id));
    }
  }, [discountCodes]);

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
    dispatch(changeLineItemQuantityThunk({ id, quantity }))
      .unwrap()
      .catch((err: ErrorObject) => {
        enqueueSnackbar(err.message, {
          variant: 'error',
          ...bottomSnackbarBasicParams,
        });
      });
  };

  const handleRemoveClick = (id: string) => {
    dispatch(changeLineItemQuantityThunk({ id, quantity: 0 }))
      .unwrap()
      .then(() => {
        enqueueSnackbar(BasketRespResultMessages.ITEM_REMOVED, {
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

  const handleClearCartClick = () => {
    if (cart) {
      dispatch(clearCartThunk({ id: cart.id, version: cart.version }));
    }
  };

  const handlePromoRemove = () => {
    if (cart && discountCodes?.length) {
      dispatch(
        removePromoThunk({
          cartId: cart.id,
          promoId: discountCodes[0].discountCode.id,
          version: cart.version,
        }),
      )
        .then(() => {
          enqueueSnackbar(BasketRespResultMessages.PROMO_REMOVED, {
            variant: 'success',
            ...topSnackbarBasicParams,
          });
        })
        .catch((err: ErrorObject) => {
          enqueueSnackbar(err.message, {
            variant: 'error',
            ...topSnackbarBasicParams,
          });
        });
    }
  };

  const handlePromoApply = (promo: string) => {
    if (cart && cart?.lineItems.length && promo) {
      dispatch(addPromoThunk({ version: cart.version, cartId: cart.id, promo: promo }))
        .unwrap()
        .then(() => {
          promo = '';
          enqueueSnackbar(BasketRespResultMessages.PROMO_APPLIED, {
            variant: 'success',
            ...topSnackbarBasicParams,
          });
        })
        .catch((err: ErrorObject) => {
          enqueueSnackbar(err.message, {
            variant: 'error',
            ...topSnackbarBasicParams,
          });
        });
    }
  };

  const matchesBigScreen = useMediaQuery('(min-width:1100px)');
  const matchesSmallScreen = useMediaQuery('(max-width:700px)');
  const matchesPricesTextContent = useMediaQuery('(max-width:450px)');

  const drawer = (
    <BasketDrawerInner
      cart={cart}
      onPromoRemove={handlePromoRemove}
      handleDialogOpen={handleDialogOpen}
      onPromoApply={(values) => {
        handlePromoApply(values.promo);
      }}
    />
  );

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
        <Typography component="h1" fontSize={matchesSmallScreen ? '1.4rem' : '1.6rem'} fontWeight={600} mb={2} pl={3}>
          Your Cart:
        </Typography>
        <List
          sx={{
            paddingX: { lg: 4 },
          }}
        >
          {cart?.lineItems.map((product, i) => {
            return (
              <BasketProduct
                product={product}
                key={`${i}-cart-prod`}
                onRemoveClick={() => {
                  handleRemoveClick(product.productId);
                }}
                onQuantityChange={(quantity) => {
                  handleQuantityChange(product.productId, quantity);
                }}
                isCounterLoading={isUpdatingProduct(product.productId)}
              />
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
            <Typography>{`${totalPrice} ${currency}`}</Typography>
          </>
        </BottomBar>
      )}
      <ConfirmModal
        onClose={handleDialogClose}
        open={dialogOpen}
        onCancel={handleDialogClose}
        onConfirm={() => {
          handleDialogClose();
          handleClearCartClick();
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
