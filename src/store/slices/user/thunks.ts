import { createAsyncThunk } from '@reduxjs/toolkit';
import { MyCustomerDraft } from '@commercetools/platform-sdk';
import { apiRoot } from '@client/client';
import { setUser } from './userSlice';

export const userRegistrationThunk = createAsyncThunk('user/registration', (regData: MyCustomerDraft, thunkAPI) => {
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
