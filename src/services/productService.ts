import client from '@/client/client';
import { Product } from '@/types';

class ProductService {
  async fetchProduct(productID: string): Promise<Product> {
    try {
      const response = await client.getClient().products().withId({ ID: productID }).get().execute();
      const product: Product = {
        id: response.body.id,
        name: response.body.masterData.current.name[`en-GB`],
        description: response.body.masterData.current.description?.[`en-GB`] || 'Product has no description',
        images: response.body.masterData.current.masterVariant.images,
        prices: response.body.masterData.current.masterVariant.prices,
      };
      return product;
    } catch (error) {
      console.error('Error!', error);
      throw error;
    }
  }
}

export const productService = new ProductService();
