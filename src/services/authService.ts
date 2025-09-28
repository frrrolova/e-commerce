import client from '@/client/client';
import { Customer, MyCustomerDraft } from '@commercetools/platform-sdk';

export const loginService = (email: string, password: string) => {
  return client.getClient().me().login().post({ body: { email, password } }).execute();
};

export const registrationService = (regData: MyCustomerDraft) => {
  return client.getClient().me().signup().post({ body: regData }).execute();
};

export const setAddressesService = (customer: Customer, shipId: string, billId: string) => {
  return client
    .getClient()
    .me()
    .post({
      body: {
        version: customer.version,
        actions: [
          {
            action: 'addShippingAddressId',
            addressId: shipId,
          },
          {
            action: 'addBillingAddressId',
            addressId: billId,
          },
        ],
      },
    })
    .execute();
};
