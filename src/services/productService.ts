import client from '@/client/client';
import { ProductCard } from '@/types';

class ProductService {
  async fetchProduct(productID: string): Promise<ProductCard> {
    try {
      const response = await client.getClient().products().withId({ ID: productID }).get().execute();
      const product: ProductCard = {
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
