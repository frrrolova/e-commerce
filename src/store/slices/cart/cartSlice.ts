import { Cart } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  addPromoThunk,
  addToCartThunk,
  changeLineItemQuantityThunk,
  clearCartThunk,
  getActivePromoThunk,
  initCartThunk,
  removePromoThunk,
} from './thunks';

export interface CartState {
  cart: Cart | null;
  isAddProductPending: boolean; // using to handle LoadingButton's state
  isQuantityChanging: boolean; // handling counter btns state
  updatingProductIds: string[];
  isCartClearing: boolean;
  promo: string;
}

export const initialState: CartState = {
  cart: null,
  isAddProductPending: false,
  isQuantityChanging: false,
  updatingProductIds: [],
  isCartClearing: false,
  promo: '',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Cart | null>) => {
      state.cart = action.payload;
    },
    removePromo: (state) => {
      state.promo = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // getting cart
      .addCase(initCartThunk.fulfilled, (state, action) => {
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
      })
      // cart clear
      .addCase(clearCartThunk.fulfilled, (state) => {
        state.isCartClearing = false;
        state.cart = null;
        state.promo = '';
      })
      .addCase(clearCartThunk.pending, (state) => {
        state.isCartClearing = true;
      })
      .addCase(clearCartThunk.rejected, (state) => {
        state.isCartClearing = false;
      })
      // add promo
      .addCase(addPromoThunk.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      // get active promo
      .addCase(getActivePromoThunk.fulfilled, (state, action) => {
        state.promo = action.payload.code;
      })
      // remove promo
      .addCase(removePromoThunk.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.promo = '';
      });
  },
});

export default cartSlice;
