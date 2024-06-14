import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ErrorResponse,
  MyCustomerDraft,
  ClientResponse,
  Customer,
  BaseAddress,
  MyCustomerChangePassword,
} from '@commercetools/platform-sdk';
import client from '@client/client';
import { logout, setUser } from './userSlice';
import { LSTokenPrefixes } from '@/enums/ls.enums';
import { loginService, registrationService } from '@/services/authService';
import { AsyncThunkApi } from '@/store/store';
import { addAddress, changePassword, getUser, updateUser } from '@/services/userService';
import { UserUpdateData } from '@/types';
import { AddressTypes } from '@/enums/auth-form.enum';
import { lsUserKey } from '@/core/commonConstants';

export const userRegistrationThunk = createAsyncThunk('user/registration', (regData: MyCustomerDraft, thunkAPI) => {
  return registrationService(regData)
    .then((resp) => {
      localStorage.setItem(lsUserKey, JSON.stringify(resp.body.customer));
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
  localStorage.setItem(lsUserKey, JSON.stringify(customer));
  thunkAPI.dispatch(setUser(customer));
  return client.getClient().me().get().execute(); // doing this for login-token request
}

export const userGetInfoThunk = createAsyncThunk('user/get-info', () => {
  return getUser().then((resp) => {
    localStorage.setItem(lsUserKey, JSON.stringify(resp.body));
    return resp;
  });
});

export const userUpdateThunk = createAsyncThunk('user/update', (updData: UserUpdateData, thunkAPI: AsyncThunkApi) => {
  return updateUser(updData.updAction, updData.version)
    .then((resp) => {
      localStorage.setItem(lsUserKey, JSON.stringify(resp.body));
      thunkAPI.dispatch(setUser(resp.body));
    })
    .catch((err: ErrorResponse) => {
      return thunkAPI.rejectWithValue(err);
    });
});

export const userAddressUpdateThunk = createAsyncThunk(
  'user/address-update',
  (
    {
      value,
      version,
      addressType,
      isDefault,
      useAsBoth,
    }: { value: BaseAddress; version: number; addressType: AddressTypes; isDefault: boolean; useAsBoth: boolean },
    thunkAPI: AsyncThunkApi,
  ) => {
    return addAddress(value, version, addressType, isDefault, useAsBoth)
      .then((resp) => {
        localStorage.setItem(lsUserKey, JSON.stringify(resp.body));
        thunkAPI.dispatch(setUser(resp.body));
      })
      .catch((err: ErrorResponse) => {
        return thunkAPI.rejectWithValue(err);
      });
  },
);

export const changePasswordThunk = createAsyncThunk(
  'user/password-update',
  (updData: MyCustomerChangePassword, thunkAPI: AsyncThunkApi) => {
    return changePassword(updData)
      .then((resp) => {
        thunkAPI.dispatch(logout());
        return thunkAPI.dispatch(userLoginThunk({ email: resp.body.email, password: updData.newPassword }));
      })
      .catch((err: ErrorResponse) => {
        return thunkAPI.rejectWithValue(err);
      });
  },
);
