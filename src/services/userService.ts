import client from '@/client/client';
import { ClientResponse, Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';

export function getUser(): Promise<ClientResponse<Customer>> {
  return client.getClient().me().get().execute();
}

export function updateUser(updAction: MyCustomerUpdateAction, version: number) {
  return client
    .getClient()
    .me()
    .post({
      body: {
        version,
        actions: [updAction],
      },
    })
    .execute();
}
