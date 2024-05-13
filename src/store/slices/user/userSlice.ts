import { Customer } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { userRegistrationThunk, userLoginThunk } from './thunk';
import { LoginResponseData } from '@/types';

interface UserState {
  accessToken: string;
  refreshToken: string;
  user: Customer | null;
  error: string;
  isPending: boolean;
}

const initialState: UserState = {
  accessToken: '',
  refreshToken: '',
  user: null,
  error: '',
  isPending: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Customer>) => {
      state.user = action.payload;
    },
    setCredentials: (state, action: PayloadAction<LoginResponseData>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegistrationThunk.pending, (state) => {
        state.error = '';
        state.isPending = true;
      })
      .addCase(userRegistrationThunk.fulfilled, (state) => {
        state.isPending = false;
        // update state with user or credentials
      })
      .addCase(userRegistrationThunk.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.error.message ?? '';
      })
      .addCase(userLoginThunk.pending, (state) => {
        state.error = '';
        state.isPending = true;
      })
      .addCase(userLoginThunk.fulfilled, (state) => {
        state.isPending = false;
      })
      .addCase(userLoginThunk.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.error.message ?? '';
      });
  },
});

export const { setUser, setCredentials } = userSlice.actions;

export default userSlice;
