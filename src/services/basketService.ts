import client from '@/client/client';

export function getActiveCart() {
  return client.getClient().me().activeCart().get().execute();
}

export function addToCart(productId: string) {
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
      console.log(e);
      return client
        .getClient()
        .me()
        .carts()
        .post({ body: { currency: 'EUR', lineItems: [{ productId }] } })
        .execute(); // need to get it from store
    });
}
