import client from '@/client/client';
import { Product } from '@/types';
import { mapProductProjections } from '@/utils/mapProductProjections';
import { mapProducts } from '@/utils/mapProducts';
class CatalogService {
  async fetchProducts(): Promise<Product[]> {
    try {
      const response = await client
        .getClient()
        .products()
        .get({ queryArgs: { limit: 25 } })
        .execute();

      const products: Product[] = mapProducts(response.body.results);
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async fetchProductById(productID: string) {
    try {
      const response = await client.getClient().products().withId({ ID: productID }).get().execute();
      const product: Product[] = mapProducts([response.body]);
      return product[0];
    } catch (error) {
      console.error('Error!', error);
      throw error;
    }
  }

  async fetchProductsByCategory(categoryId: string): Promise<Product[]> {
    try {
      const response = await client
        .getClient()
        .productProjections()
        .get({
          queryArgs: {
            where: [`categories(id="${categoryId}")`],
          },
        })
        .execute();

      const products: Product[] = mapProductProjections(response.body.results);
      return products;
    } catch (error) {
      console.error('Error fetching products by category id:', error);
      throw error;
    }
  }
}

export const catalogService = new CatalogService();
