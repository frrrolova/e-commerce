import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorResponse, MyCustomerDraft, ClientResponse, Customer, CustomerDraft } from '@commercetools/platform-sdk';
import client from '@client/client';
import { setUser } from './userSlice';
import { LSTokenPrefixes } from '@/enums/ls.enums';
import { loginService } from '@/services/loginService';
import { AsyncThunkApi } from '@/store/store';
import { getUser } from '@/services/userService';

export const userRegistrationThunk = createAsyncThunk('user/registration', (regData: CustomerDraft, thunkAPI) => {
  return client
    .getClient()
    .customers()
    .post({ body: regData })
    .execute()
    .then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.body.customer));
      thunkAPI.dispatch(setUser(resp.body.customer));

      client.initNewClient({
        login: regData.email,
        password: regData.password,
        tokenType: LSTokenPrefixes.LOGGED_IN,
      });

      return loginService(regData.email, regData.password as string).then(() => {
        return handleSuccessfulLoginResponse(regData.email, regData.password as string, resp.body.customer, thunkAPI);
      });
    })
    .catch((err: ClientResponse<ErrorResponse>) => {
      return thunkAPI.rejectWithValue(err.body ?? err);
    });
});

export const userLoginThunk = createAsyncThunk('user/login', (regData: MyCustomerDraft, thunkAPI) => {
  return loginService(regData.email, regData.password)
    .then((resp) => {
      return handleSuccessfulLoginResponse(regData.email, regData.password, resp.body.customer, thunkAPI);
    })
    .catch((err: ErrorResponse) => {
      return thunkAPI.rejectWithValue(err);
    });
});

function handleSuccessfulLoginResponse(email: string, password: string, customer: Customer, thunkAPI: AsyncThunkApi) {
  client.initNewClient({ login: email, password: password, tokenType: LSTokenPrefixes.LOGGED_IN });
  localStorage.setItem('user', JSON.stringify(customer));
  thunkAPI.dispatch(setUser(customer));
  return client.getClient().me().get().execute(); // doing this for login-token request
}

export const userGetInfoThunk = createAsyncThunk('user/get-info', () => {
  return getUser().then((resp) => {
    console.log(resp);
    return resp;
  });
  // .catch((err: ErrorResponse) => {
  //   console.log(err);
  // });
});
