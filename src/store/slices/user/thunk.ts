import { createAsyncThunk } from '@reduxjs/toolkit';
import { CustomerDraft } from '@commercetools/platform-sdk';
import { apiRoot } from '../../../client/client';
import { setUser } from './userSlice';

export const userRegistrationThunk = createAsyncThunk('user/login', (regData: CustomerDraft, thunkAPI) => {
  return apiRoot
    .customers()
    .post({ body: regData })
    .execute()
    .then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.body.customer));
      thunkAPI.dispatch(setUser(resp.body.customer));
    });
});
