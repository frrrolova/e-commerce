import { GetThunkAPI, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import userSlice from './slices/user/userSlice';
import { Cart } from '@commercetools/platform-sdk';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import cartSlice, { initialState as cartInitialState } from './slices/cart/cartSlice';

const initStore = (cart: Cart | null) =>
  configureStore({
    reducer: {
      cart: cartSlice.reducer,
      user: userSlice.reducer,
    },
    preloadedState: {
      cart: { ...cartInitialState, cart },
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
