import client from '@/client/client';
import { Cart, ClientResponse } from '@commercetools/platform-sdk';

export function getActiveCart(): Promise<ClientResponse<Cart>> {
  return client.getClient().me().activeCart().get().execute();
}

export function initCart(): Promise<Cart | null> {
  return getActiveCart()
    .then((resp) => {
      return resp.body;
    })
    .catch(() => {
      return Promise.resolve(null);
    });
}

export function addToCart(productId: string): Promise<ClientResponse<Cart>> {
  return getActiveCart()
    .then((res) => {
      // if active cart is existing we need to call updatedCart action
      console.log(res);
      return client
        .getClient()
        .me()
        .carts()
        .withId({ ID: res.body.id })
        .post({
          body: {
            version: res.body.version,
            actions: [
              {
                action: 'addLineItem',
                productId,
                variantId: 1,
                quantity: 1,
              },
            ],
          },
        })
        .execute();
    })
    .catch((e) => {
      // if e === 404 then we need to create a new cart
      if (e.statusCode === 404) {
        return client
          .getClient()
          .me()
          .carts()
          .post({ body: { currency: 'EUR', lineItems: [{ productId }] } })
          .execute(); // need to get it from store
      }
      console.log(e);
      throw e;
    });
}
