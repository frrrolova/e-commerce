import client from '@/client/client';
import { Product } from '@/types';
import { Product as ProductCT } from '@commercetools/platform-sdk';

class CatalogService {
  async fetchProducts(): Promise<Product[]> {
    try {
      const response = await client
        .getClient()
        .products()
        .get({ queryArgs: { limit: 25 } })
        .execute();

      // Map the commercetools products to UI-product type
      const products: Product[] = response.body.results.map((product: ProductCT) => {
        return {
          id: product.id,
          name: product.masterData.current.name[`en-GB`],
          description: product.masterData.current.description?.[`en-GB`] || 'Product has no description',
          images: product.masterData.current.masterVariant.images,
          prices: product.masterData.current.masterVariant.prices,
        };
      });
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
}

export const catalogService = new CatalogService();
