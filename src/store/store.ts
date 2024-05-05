import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

const store = configureStore({
  reducer: {
    // Add your reducers here
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // here will be middleware for asynk side effects
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
