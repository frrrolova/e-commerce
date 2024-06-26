import client from '@/client/client';
import { Category, FetchProductsRequest, FetchProductsResponse, Filter, FilterData, Product } from '@/types';
import { mapProductProjections } from '@/utils/mapProductProjections';
import { AttributeEnumType } from '@commercetools/platform-sdk';
import sortMapping, { pageLimit } from './constants';
import { mapCategories } from '@/utils/mapCategories';
import { FilterNames, SortOptions } from '@/pages/Catalog/constants';
import { defaultPriceRange } from '@/components/catalog/FiltersForm/constants';

class CatalogService {
  loading = false;

  fetchProducts = async ({ request }: FetchProductsRequest): Promise<FetchProductsResponse> => {
    this.loading = true;

    const url = new URL(request.url);

    const queryParams = {
      filters: {
        size: url.searchParams.get(FilterNames.SIZE) === 'all' ? '' : url.searchParams.get(FilterNames.SIZE),
        color: url.searchParams.get(FilterNames.COLOR) === 'all' ? '' : url.searchParams.get(FilterNames.COLOR),
        price: this.parsPrice(url.searchParams.get(FilterNames.PRICE)),
        categoryId:
          url.searchParams.get(FilterNames.CATEGORY_ID) === 'all' ? '' : url.searchParams.get(FilterNames.CATEGORY_ID),
      },
      search: url.searchParams.get(FilterNames.SEARCH) || '',
      sort: url.searchParams.get(FilterNames.SORT) || SortOptions[0].key,
      page: Number(url.searchParams.get(FilterNames.PAGE)) || 1,
    };

    try {
      const filterStr = this.buildFilterString(queryParams.filters);

      const response = await client
        .getClient()
        .productProjections()
        .search()
        .get({
          queryArgs: {
            limit: pageLimit.productAmount,
            offset: (queryParams.page - 1) * pageLimit.productAmount,
            filter: filterStr,
            markMatchingVariants: true,
            sort: queryParams?.sort ? [sortMapping[queryParams.sort]] : [],
            'text.en-GB': queryParams?.search,
            fuzzy: true,
          },
        })
        .execute();

      const products: Product[] = mapProductProjections(response.body.results);
      const pagination = {
        pageAmount: Math.ceil((response.body.total || 0) / response.body.limit),
      };
      return { products, pagination, queryParams };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    } finally {
      this.loading = false;
    }
  };

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

        type.attributes.forEach((attr) => {
          const filter: Filter = {
            name: attr.name,
            label: attr.label[`en-US`],
            options: (attr.type as AttributeEnumType).values,
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

  async fetchCategories(): Promise<Category[]> {
    try {
      const response = await client.getClient().categories().get().execute();
      const categories: Category[] = mapCategories(response.body.results);
      return categories;
    } catch (error) {
      console.error('Error!', error);
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
        } else if (key === 'categoryId') {
          filterStr.push(`categories.id:subtree("${value}")`);
        } else {
          filterStr.push(`variants.attributes.${key}.key:"${value}"`);
        }
      }
    }

    return filterStr;
  }

  private parsPrice(str: string | null): number[] {
    if (!str) return defaultPriceRange;
    const arr = str.split(',').map((item: string) => Number(item));
    return arr;
  }
}

export const catalogService = new CatalogService();
