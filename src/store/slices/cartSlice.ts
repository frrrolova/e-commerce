import { Cart } from '@commercetools/platform-sdk';
import { createSlice } from '@reduxjs/toolkit';

const initialState: Cart | null = null;

export const cartSlice = createSlice<Cart | null, Record<string, never>, 'cart', Record<string, never>, 'cart'>({
  name: 'cart',
  initialState,
  reducers: {},
});

export default cartSlice;
