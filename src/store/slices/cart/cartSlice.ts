import { Cart } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addToCartThunk, changeLineItemQuantityThunk, getCartThunk } from './thunks';

export interface CartState {
  cart: Cart | null;
  isAddProductPending: boolean; // using to handle LoadingButton's state
  isQuantityChanging: boolean; // handling counter btns state
  updatingProductIds: string[];
}

export const initialState: CartState = {
  cart: null,
  isAddProductPending: false,
  isQuantityChanging: false,
  updatingProductIds: [],
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
      // getting cart
      .addCase(getCartThunk.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      // adding product
      .addCase(addToCartThunk.pending, (state) => {
        state.isAddProductPending = true;
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.isAddProductPending = false;
        state.cart = action.payload;
      })
      .addCase(addToCartThunk.rejected, (state) => {
        state.isAddProductPending = false;
      })
      // changing product quantity
      .addCase(changeLineItemQuantityThunk.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.isQuantityChanging = false;
        state.updatingProductIds = state.updatingProductIds.filter((id) => id !== action.meta.arg.id);
      })
      .addCase(changeLineItemQuantityThunk.pending, (state, action) => {
        state.isQuantityChanging = true;
        state.updatingProductIds.push(action.meta.arg.id);
      })
      .addCase(changeLineItemQuantityThunk.rejected, (state, action) => {
        state.isQuantityChanging = true;
        state.updatingProductIds = state.updatingProductIds.filter((id) => id !== action.meta.arg.id);
      });
  },
});

export default cartSlice;
