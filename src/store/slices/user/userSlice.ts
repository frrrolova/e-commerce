import { ClientResponse, Customer, ErrorObject, ErrorResponse } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import { userRegistrationThunk } from './thunks';
import client from '@/client/client';
import { LSTokenPrefixes } from '@/enums/ls.enums';
import { userRegistrationThunk, userLoginThunk, userGetInfoThunk } from './thunks';

export interface UserState {
  user: Customer | null;
  authError: string;
  isAuthPending: boolean;
  isUserDataLoading: boolean;
}

const userFromLS = localStorage.getItem('user');

const initialState: UserState = {
  user: userFromLS ? JSON.parse(userFromLS) : null,
  authError: '',
  isAuthPending: false,
  isUserDataLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Customer>) => {
      state.user = action.payload;
    },
    clearError: (state) => {
      state.authError = '';
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem(`${LSTokenPrefixes.LOGGED_IN}_token`);
      localStorage.removeItem('user');
      client.clearCurrentClient();
    },
  },
  extraReducers: (builder) => {
    builder
      // registration
      .addCase(userRegistrationThunk.pending, (state) => {
        state.authError = '';
        state.isAuthPending = true;
      })
      .addCase(userRegistrationThunk.fulfilled, (state) => {
        state.isAuthPending = false;
        // update state with user or credentials
      })
      .addCase(userRegistrationThunk.rejected, (state, action) => {
        state.isAuthPending = false;

        if (action.error) {
          state.authError = action.error.message || '';
        } else {
          const payload = action.payload as ErrorResponse;
          const err: ErrorObject | null = payload.errors?.[0] || null;
          if (err) {
            state.authError = err.message ?? '';
          }
        }
      })
      // login
      .addCase(userLoginThunk.pending, (state) => {
        state.authError = '';
        state.isAuthPending = true;
      })
      .addCase(userLoginThunk.fulfilled, (state) => {
        state.isAuthPending = false;
      })
      .addCase(userLoginThunk.rejected, (state, action) => {
        state.isAuthPending = false;
        const payload = action.payload as ErrorResponse;
        const err: ErrorObject | null = payload.errors?.[0] || null;
        if (err) {
          state.authError = err.message ?? '';
        }
      })
      .addCase(userGetInfoThunk.pending, (state) => {
        state.isUserDataLoading = true;
      })
      .addCase(userGetInfoThunk.fulfilled, (state, action: PayloadAction<ClientResponse<Customer>>) => {
        state.isUserDataLoading = false;
        state.user = action.payload.body;
      })
      .addCase(userGetInfoThunk.rejected, (state) => {
        state.isUserDataLoading = false;
      });
  },
});

export const { setUser, clearError, logout } = userSlice.actions;

export default userSlice;
