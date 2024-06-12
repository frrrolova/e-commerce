import { addToCart, changeLineItemQuantity, getActiveCart } from '@/services/cartService';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorResponse } from 'react-router-dom';

export const getCartThunk = createAsyncThunk('cart/get', (_, thunkAPI) => {
  return getActiveCart()
    .then((resp) => resp.body)
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
