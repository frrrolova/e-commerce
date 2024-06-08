import { Cart } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addToCartThunk } from './thunks';

export interface CartState {
  cart: Cart | null;
  isAddProductPending: boolean; // use in to handle LoadingButton's state
}

const initialState: CartState = {
  cart: null,
  isAddProductPending: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Cart | null>) => {
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartThunk.pending, (state) => {
        state.isAddProductPending = true;
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.isAddProductPending = false;
        state.cart = action.payload;
      })
      .addCase(addToCartThunk.rejected, (state) => {
        state.isAddProductPending = false;
      });
  },
});

export default cartSlice;
