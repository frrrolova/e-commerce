import { GetThunkAPI, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import projectSlice from './slices/projectSlice';
import userSlice from './slices/user/userSlice';
import { Project } from '@commercetools/platform-sdk';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';

const initStore = (project: Project) =>
  configureStore({
    reducer: {
      project: projectSlice.reducer,
      user: userSlice.reducer,
    },
    preloadedState: {
      project: project,
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
