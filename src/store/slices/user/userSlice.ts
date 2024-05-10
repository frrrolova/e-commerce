import { Customer } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { userRegistrationThunk } from './thunk';

interface UserState {
  user: Customer | null;
  registrationError: string;
  isPending: boolean;
}

const initialState: UserState = {
  user: null,
  registrationError: '',
  isPending: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Customer>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegistrationThunk.pending, (state) => {
        state.registrationError = '';
        state.isPending = true;
      })
      .addCase(userRegistrationThunk.fulfilled, (state) => {
        state.isPending = false;
        // update state with user or credentials
      })
      .addCase(userRegistrationThunk.rejected, (state, action) => {
        state.isPending = false;
        state.registrationError = action.error.message ?? '';
      });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice;
