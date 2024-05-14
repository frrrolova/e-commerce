import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorResponse, MyCustomerDraft, ClientResponse } from '@commercetools/platform-sdk';
import client, { LSTokenPrefixes } from '@client/client';
import { setUser } from './userSlice';

export const userRegistrationThunk = createAsyncThunk('user/registration', (regData: MyCustomerDraft, thunkAPI) => {
  console.log(client.getClient() === client.getClient());

  return client
    .getClient()
    .me()
    .signup()
    .post({ body: regData })
    .execute()
    .then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.body.customer));
      thunkAPI.dispatch(setUser(resp.body.customer));

      client.initNewClient({ login: regData.email, password: regData.password, tokenType: LSTokenPrefixes.LOGGED_IN });

      return (
        client
          .getClient()
          // .me()
          .login()
          .post({ body: { email: regData.email, password: regData.password } })
          .execute()
          .then(async () => {
            console.log('got it!');
            // client.initNewClient({
            //   login: regData.email,
            //   password: regData.password,
            //   tokenType: LSTokenPrefixes.LOGGED_IN,
            // });
            return client.getClient().orders().get().execute();
          })
      );
    })
    .catch((err: ClientResponse<ErrorResponse>) => {
      return thunkAPI.rejectWithValue(err.body ?? err);
    });
});
