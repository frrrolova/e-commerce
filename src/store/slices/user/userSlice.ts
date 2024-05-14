import { Customer, ErrorObject, ErrorResponse } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { userRegistrationThunk } from './thunks';
import client, { LSTokenPrefixes } from '@/client/client';

interface UserState {
  user: Customer | null;
  error: string;
  isPending: boolean;
}

const initialState: UserState = {
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
    clearError: (state) => {
      state.error = '';
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem(`${LSTokenPrefixes.LOGGED_IN}_token`);
      client.clearCurrentClient();
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

        if (action.error) {
          state.error = action.error.message || '';
        } else {
          const payload = action.payload as ErrorResponse;
          const err: ErrorObject | null = payload.errors?.[0] || null;
          if (err) {
            state.error = err.message ?? '';
          }
        }
      });
  },
});

export const { setUser, clearError, logout } = userSlice.actions;

export default userSlice;
