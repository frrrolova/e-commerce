import { createAsyncThunk } from '@reduxjs/toolkit';
import { MyCustomerDraft } from '@commercetools/platform-sdk';
import { apiRoot } from '@/client/client';
import { setUser, setCredentials } from './userSlice';
import { loginService } from '@/services/loginService';

export const userRegistrationThunk = createAsyncThunk('user/register', (regData: MyCustomerDraft, thunkAPI) => {
  return apiRoot
    .me()
    .signup()
    .post({ body: regData })
    .execute()
    .then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.body.customer));
      thunkAPI.dispatch(setUser(resp.body.customer));
    });
});

export const userLoginThunk = createAsyncThunk('user/login', (regData: MyCustomerDraft, thunkAPI) => {
  return loginService(regData.email, regData.password).then((resp) => {
    localStorage.setItem('user', JSON.stringify(resp.body.customer));
    thunkAPI.dispatch(setUser(resp.body.customer));
    const storedToken = localStorage.getItem('CREDENTIALS');
    let accessToken = '';
    let refreshToken = '';
    if (storedToken) {
      accessToken = JSON.parse(storedToken).token;
      refreshToken = JSON.parse(storedToken).refreshToken;
    }
    thunkAPI.dispatch(setCredentials({ accessToken, refreshToken }));
  });
});
