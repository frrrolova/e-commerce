import { addToCart } from '@/services/cartService';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorResponse } from 'react-router-dom';

export const addToCartThunk = createAsyncThunk('user/login', (productId: string, thunkAPI) => {
  return addToCart(productId)
    .then((resp) => {
      return resp.body;
    })
    .catch((err: ErrorResponse) => {
      return thunkAPI.rejectWithValue(err);
    });
});
