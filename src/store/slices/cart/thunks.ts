import {
  addPromo,
  addToCart,
  changeLineItemQuantity,
  clearCart,
  getActivePromo,
  initCart,
  removePromo,
} from '@/services/cartService';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorResponse } from 'react-router-dom';
import cartSlice from './cartSlice';

export const initCartThunk = createAsyncThunk('cart/init', (_, thunkAPI) => {
  return initCart()
    .then((resp) => resp)
    .catch((err: ErrorResponse) => {
      return thunkAPI.rejectWithValue(err);
    });
});

export const addToCartThunk = createAsyncThunk('cart/create', (productId: string, thunkAPI) => {
  return addToCart(productId)
    .then((resp) => {
      return resp.body;
    })
    .catch((err: ErrorResponse) => {
      return thunkAPI.rejectWithValue(err);
    });
});

export const changeLineItemQuantityThunk = createAsyncThunk(
  'cart/change-quantity',
  ({ id, quantity }: { id: string; quantity: number }, thunkAPI) => {
    return changeLineItemQuantity(id, quantity)
      .then((resp) => {
        return resp.body;
      })
      .catch((err: ErrorResponse) => {
        return thunkAPI.rejectWithValue(err);
      });
  },
);

export const clearCartThunk = createAsyncThunk(
  'cart/clear',
  ({ id, version }: { id: string; version: number }, thunkAPI) => {
    return clearCart(id, version)
      .then((resp) => {
        return resp.body;
      })
      .catch((err: ErrorResponse) => {
        return thunkAPI.rejectWithValue(err);
      });
  },
);

export const addPromoThunk = createAsyncThunk(
  'cart/add-promo',
  ({ version, cartId, promo }: { version: number; cartId: string; promo: string }, thunkAPI) => {
    return addPromo(cartId, version, promo)
      .then((resp) => {
        cartSlice.actions.setCart(resp.body);
        return resp.body;
      })
      .catch((err: ErrorResponse) => {
        return thunkAPI.rejectWithValue(err);
      });
  },
);

export const getActivePromoThunk = createAsyncThunk('cart/active-promo', (id: string, thunkAPI) => {
  return getActivePromo(id)
    .then((resp) => {
      return resp.body;
    })
    .catch((err: ErrorResponse) => {
      return thunkAPI.rejectWithValue(err);
    });
});

export const removePromoThunk = createAsyncThunk(
  'cart/remove-promo',
  ({ cartId, promoId, version }: { cartId: string; promoId: string; version: number }, thunkAPI) => {
    return removePromo(cartId, promoId, version)
      .then((resp) => {
        return resp.body;
      })
      .catch((err: ErrorResponse) => {
        return thunkAPI.rejectWithValue(err);
      });
  },
);
