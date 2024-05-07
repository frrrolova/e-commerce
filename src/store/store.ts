import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import shopSlice from './slices/shopSlice';
import { Shop } from '../types';

const initStore = (shop: Shop) =>
  configureStore({
    reducer: {
      shop: shopSlice.reducer,
    },
    preloadedState: {
      shop: shop,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // here will be middleware for asynk side effects
  });

export type RootState = ReturnType<ReturnType<typeof initStore>['getState']>;

export type AppDispatch = ReturnType<typeof initStore>['dispatch'];

export type AppStore = ReturnType<typeof initStore>;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default initStore;
