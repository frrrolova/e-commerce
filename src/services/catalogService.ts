import client from '@/client/client';
import { Product } from '@commercetools/platform-sdk';

class CatalogService {
  async fetchProducts(): Promise<Product[]> {
    try {
      const response = await client.getClient().products().get().execute();
      return response.body.results;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
}

export const catalogService = new CatalogService();
