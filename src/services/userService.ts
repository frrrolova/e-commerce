import client from '@/client/client';
import { ResponseErrorCodes } from '@/enums/responseErrors.enum';
import NetworkError from '@/errors/network.error';
import { ClientResponse, Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';

export function getUser(): Promise<ClientResponse<Customer>> {
  return client.getClient().me().get().execute();
}

export function updateUser(updAction: MyCustomerUpdateAction, version: number): Promise<ClientResponse<Customer>> {
  return client
    .getClient()
    .me()
    .post({
      body: {
        version,
        actions: [updAction],
      },
    })
    .execute()
    .catch((e) => {
      if (e.name === ResponseErrorCodes.NETWORK_ERR) {
        throw new NetworkError();
      }
      if (e.name === ResponseErrorCodes.CONCURRENT_MODIFICATION) {
        return updateUser(updAction, e.body.errors[0].currentVersion);
      }
      throw e;
    });
}
