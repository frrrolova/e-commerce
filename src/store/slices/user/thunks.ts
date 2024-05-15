import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorResponse, MyCustomerDraft } from '@commercetools/platform-sdk';
import { apiRoot } from '@client/client';
import { setUser } from './userSlice';
import { loginService } from '@/services/loginService';

export const userRegistrationThunk = createAsyncThunk('user/registration', (regData: MyCustomerDraft, thunkAPI) => {
  return apiRoot
    .me()
    .signup()
    .post({ body: regData })
    .execute()
    .then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.body.customer));
      thunkAPI.dispatch(setUser(resp.body.customer));
    })
    .catch((err: ErrorResponse) => {
      return thunkAPI.rejectWithValue(err);
    });
});

export const userLoginThunk = createAsyncThunk('user/login', (regData: MyCustomerDraft, thunkAPI) => {
  return loginService(regData.email, regData.password)
    .then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.body.customer));
      thunkAPI.dispatch(setUser(resp.body.customer));
    })
    .catch((err: ErrorResponse) => {
      return thunkAPI.rejectWithValue(err);
    });
});
