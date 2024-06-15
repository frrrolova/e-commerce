import { ClientResponse, Customer, ErrorObject, ErrorResponse } from '@commercetools/platform-sdk';
import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit';
import client from '@/client/client';
import { LSTokenPrefixes } from '@/enums/ls.enums';
import {
  userRegistrationThunk,
  userLoginThunk,
  userGetInfoThunk,
  userUpdateThunk,
  userAddressUpdateThunk,
  changePasswordThunk,
} from './thunks';
import { lsUserKey } from '@/core/commonConstants';
import cartSlice from '../cart/cartSlice';

export interface UserState {
  user: Customer | null;
  authError: string;
  userUpdateError: string;
  isAuthPending: boolean;
  isUserDataLoading: boolean;
}

const userFromLS = localStorage.getItem(lsUserKey);

const handleRejection = (
  errorFieldToUpdate: keyof Pick<typeof initialState, 'authError' | 'userUpdateError'>,
  state: Draft<UserState>,
  action: PayloadAction<ErrorResponse>,
) => {
  const payload = action.payload;
  const err: ErrorObject | null = payload.errors?.[0] || null;
  if (err) {
    state[errorFieldToUpdate] = err.message ?? '';
  }
};

const initialState: UserState = {
  user: userFromLS ? JSON.parse(userFromLS) : null,
  authError: '',
  userUpdateError: '',
  isAuthPending: false,
  isUserDataLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Customer | null>) => {
      state.user = action.payload;
    },
    clearError: (state) => {
      state.authError = '';
      state.userUpdateError = '';
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem(`${LSTokenPrefixes.LOGGED_IN}_token`);
      localStorage.removeItem(lsUserKey);
      client.clearCurrentClient();
      cartSlice.actions.setCart(null);
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
          handleRejection('authError', state, action as PayloadAction<ErrorResponse>);
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
        handleRejection('authError', state, action as PayloadAction<ErrorResponse>);
      })
      // get User info
      .addCase(userGetInfoThunk.pending, (state) => {
        state.isUserDataLoading = true;
      })
      .addCase(userGetInfoThunk.fulfilled, (state, action: PayloadAction<ClientResponse<Customer>>) => {
        state.isUserDataLoading = false;
        state.user = action.payload.body;
      })
      .addCase(userGetInfoThunk.rejected, (state) => {
        state.isUserDataLoading = false;
      })
      // upd User
      .addCase(userUpdateThunk.rejected, (state, action) => {
        handleRejection('userUpdateError', state, action as PayloadAction<ErrorResponse>);
      })
      .addCase(userAddressUpdateThunk.rejected, (state, action) => {
        handleRejection('userUpdateError', state, action as PayloadAction<ErrorResponse>);
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        handleRejection('userUpdateError', state, action as PayloadAction<ErrorResponse>);
      });
  },
});

export const { setUser, clearError, logout } = userSlice.actions;

export default userSlice;
