import client from '@/client/client';
import { ResponseErrorCodes } from '@/enums/responseErrors.enum';
import NetworkError from '@/errors/network.error';
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
      console.error('User has not active cart');
      return Promise.resolve(null);
    });
}

export function addToCart(productId: string): Promise<ClientResponse<Cart>> {
  return getActiveCart()
    .then((res) => {
      // if active cart is existing we need to call updatedCart action
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
      if (e.name === ResponseErrorCodes.NETWORK_ERR || e.statusCode === 0) {
        throw new NetworkError();
      }
      // if e === 404 then we need to create a new cart
      if (e.statusCode === 404) {
        return client
          .getClient()
          .me()
          .carts()
          .post({ body: { currency: 'EUR', lineItems: [{ productId }] } })
          .execute(); // need to get it from store
      }
      throw e;
    });
}

// quantity should be 0 to remove item from cart
export function changeLineItemQuantity(productId: string, quantity: number): Promise<ClientResponse<Cart>> {
  return getActiveCart()
    .then((resp) => {
      const currentItem = resp.body.lineItems.find((item) => item.productId === productId);
      return client
        .getClient()
        .me()
        .carts()
        .withId({ ID: resp.body.id })
        .post({
          body: {
            version: resp.body.version,
            actions: [
              {
                action: 'changeLineItemQuantity',
                lineItemId: currentItem?.id,
                quantity: quantity,
              },
            ],
          },
        })
        .execute();
    })
    .catch((e) => {
      if (e.name === ResponseErrorCodes.NETWORK_ERR || e.statusCode === 0) {
        throw new NetworkError();
      }
      throw e;
    });
}

export function clearCart(id: string, version: number) {
  return client
    .getClient()
    .me()
    .carts()
    .withId({ ID: id })
    .delete({ queryArgs: { version: version } })
    .execute()
    .catch((e) => {
      if (e.name === ResponseErrorCodes.NETWORK_ERR || e.statusCode === 0) {
        throw new NetworkError();
      }
      throw e;
    });
}

export function addPromo(cartId: string, version: number, promo: string) {
  return client
    .getClient()
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: [{ action: 'addDiscountCode', code: promo }],
      },
    })
    .execute()
    .catch((e) => {
      if (e.name === ResponseErrorCodes.NETWORK_ERR || e.statusCode === 0) {
        throw new NetworkError();
      }
      throw e;
    });
}

export function getActivePromo(id: string) {
  return client.getClient().discountCodes().withId({ ID: id }).get().execute();
}

export function removePromo(cartId: string, promoId: string, version: number) {
  return client
    .getClient()
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'removeDiscountCode',
            discountCode: {
              typeId: 'discount-code',
              id: promoId,
            },
          },
        ],
      },
    })
    .execute()
    .catch((e) => {
      if (e.name === ResponseErrorCodes.NETWORK_ERR || e.statusCode === 0) {
        throw new NetworkError();
      }
      throw e;
    });
}
