import client from '@/client/client';
import { Filter, Product } from '@/types';
import { mapProductProjections } from '@/utils/mapProductProjections';

interface FilterData {
  size: string;
  color: string;
  price: number[];
}

class CatalogService {
  async fetchProducts(params?: { filters: FilterData }): Promise<Product[]> {
    try {
      const filterStr = params?.filters ? this.buildFilterString(params?.filters) : [];

      const response = await client
        .getClient()
        .productProjections()
        .search()
        .get({
          queryArgs: {
            limit: 25,
            offset: 0,
            filter: filterStr,
            markMatchingVariants: true,
          },
        })
        .execute();

      const products: Product[] = mapProductProjections(response.body.results);
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async fetchProductById(productID: string) {
    try {
      const response = await client.getClient().productProjections().withId({ ID: productID }).get().execute();
      const product: Product[] = mapProductProjections([response.body]);
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

  async fetchFilterAttributes(): Promise<Filter[]> {
    try {
      const response = await client.getClient().productTypes().get().execute();
      const productTypes = response.body.results;

      const filtersData: Filter[] = [];

      productTypes.forEach((type) => {
        if (!type.attributes) {
          return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        type.attributes.forEach((attr: any) => {
          const filter: Filter = {
            name: attr.name,
            label: attr.label[`en-US`],
            options: attr.type.values,
          };
          filtersData.push(filter);
        });
      });

      return filtersData;
    } catch (error) {
      console.error('Error fetching product attributes:', error);
      throw error;
    }
  }

  private buildFilterString(filters: FilterData): string[] {
    const filterStr: string[] = [];

    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        if (key === 'price' && Array.isArray(value)) {
          const [minPrice, maxPrice] = value;
          filterStr.push(`variants.price.centAmount:range(${minPrice * 100} to ${maxPrice * 100})`);
        } else {
          filterStr.push(`variants.attributes.${key}.key:"${value}"`);
        }
      }
    }

    return filterStr;
  }
}

export const catalogService = new CatalogService();
