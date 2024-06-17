import { Image, Price, MyCustomerUpdateAction, CategoryReference } from '@commercetools/platform-sdk';

export type PropsWithChildren = {
  children: JSX.Element;
};

export type SearchButtonParams = {
  value: string;
};

export interface Product {
  id: string;
  name: string;
  description: string;
  images: Image[] | undefined;
  prices: Price[] | undefined;
}

export interface InfoDataCard {
  heading: string;
  imgPath: string;
  subHeading: string;
  description?: string;
}

export interface UserUpdateData {
  updAction: MyCustomerUpdateAction;
  version: number;
}

export interface FilterAttributes {
  key: string;
  label: string;
}

export interface Filter {
  name: string;
  label: string;
  options: FilterAttributes[];
}

export interface Category {
  id: string;
  name: string;
  key: string | undefined;
  ancestors: CategoryReference[] | [];
  parent: CategoryReference | undefined;
}

export interface CategoryTree extends Category {
  subcategories?: Category[];
}

export interface FilterData {
  size: string | null;
  color: string | null;
  price: number[];
  categoryId: string | null;
}

export interface FilterDataUrl extends FilterData {
  sort: string;
}

export interface FetchProductsRequest {
  request: {
    url: string;
  };
}

export interface FetchProductsResponse {
  products: Product[];
  pagination: {
    pageAmount: number;
  };
  queryParams: {
    filters: FilterData;
    search: string;
    sort: string;
  };
}

export interface TeamMember {
  role: string;
  name: string;
  bio: string;
  photo: string;
  git: string;
  contributions: string[];
}
