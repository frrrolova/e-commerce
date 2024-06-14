import client from '@/client/client';
import { MyCustomerDraft } from '@commercetools/platform-sdk';

export const loginService = (email: string, password: string) => {
  return client.getClient().me().login().post({ body: { email, password } }).execute();
};

export const registrationService = (regData: MyCustomerDraft) => {
  return client.getClient().me().signup().post({ body: regData }).execute();
};
