import { createSlice } from '@reduxjs/toolkit';
import { Shop } from '../../types';

const initialState: Shop | null = null;

export const shopSlice = createSlice<Shop | null, Record<string, never>, 'shop', Record<string, never>, 'shop'>({
  name: 'shop',
  initialState,
  reducers: {},
});

export default shopSlice;
