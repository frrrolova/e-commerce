import { Customer, ErrorObject, ErrorResponse } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { userRegistrationThunk, userLoginThunk } from './thunks';

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
        const payload = action.payload as ErrorResponse;
        const err: ErrorObject | null = payload.errors?.[0] || null;
        if (err) {
          state.error = err.message ?? '';
        }
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

export const { setUser, clearError } = userSlice.actions;

export default userSlice;
