import client from '@/client/client';
import { AddressTypes } from '@/enums/auth-form.enum';
import { ResponseErrorCodes } from '@/enums/responseErrors.enum';
import NetworkError from '@/errors/network.error';
import { BaseAddress, ClientResponse, Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';

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

export function addAddress(
  value: BaseAddress,
  version: number,
  addressType: AddressTypes,
  isDefault: boolean = false,
  useAsBoth: boolean = false,
): Promise<ClientResponse<Customer>> {
  return updateUser({ action: 'addAddress', address: value }, version)
    .then((resp) => {
      const { addresses, version } = resp.body;
      const id = addresses[addresses.length - 1].id;
      if (id && addressType === AddressTypes.SHIPPING) {
        return addShipping(id, version).then((r) => {
          if (isDefault) {
            return setShippingDefault(id, r.body.version);
          }
          return r;
        });
      }
      if (id && addressType === AddressTypes.BILLING) {
        return addBilling(id, version).then((r) => {
          if (isDefault) {
            return setBillingDefault(id, r.body.version);
          }
          return r;
        });
      }
      return resp;
    })
    .then((response) => {
      const { addresses, version } = response.body;
      const id = addresses[addresses.length - 1].id;
      if (id && addressType === AddressTypes.SHIPPING && useAsBoth) {
        return addBilling(id, version).then((r) => {
          if (isDefault) {
            return setBillingDefault(id, r.body.version);
          }
          return r;
        });
      }
      if (id && addressType === AddressTypes.BILLING && useAsBoth) {
        return addShipping(id, version).then((r) => {
          if (isDefault) {
            return setShippingDefault(id, r.body.version);
          }
          return r;
        });
      }
      return response;
    });
}

function addBilling(id: string, version: number) {
  return updateUser({ action: 'addBillingAddressId', addressId: id }, version);
}

function addShipping(id: string, version: number) {
  return updateUser({ action: 'addShippingAddressId', addressId: id }, version);
}

function setBillingDefault(id: string, version: number) {
  return updateUser({ action: 'setDefaultBillingAddress', addressId: id }, version);
}

function setShippingDefault(id: string, version: number) {
  return updateUser({ action: 'setDefaultShippingAddress', addressId: id }, version);
}

// function updateAddress();
