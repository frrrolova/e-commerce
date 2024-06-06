import { GetThunkAPI, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import cartSlice from './slices/cartSlice';
import userSlice from './slices/user/userSlice';
import { Cart } from '@commercetools/platform-sdk';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';

const initStore = (cart: Cart | null) =>
  configureStore({
    reducer: {
      cart: cartSlice.reducer,
      user: userSlice.reducer,
    },
    preloadedState: {
      cart: cart,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

export type RootState = ReturnType<ReturnType<typeof initStore>['getState']>;

export type AppDispatch = ReturnType<typeof initStore>['dispatch'];

export type AppStore = ReturnType<typeof initStore>;

export type AsyncThunkApi = GetThunkAPI<AsyncThunkConfig>;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default initStore;
