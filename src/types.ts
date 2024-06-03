// import { MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { Image, Price, MyCustomerUpdateAction, CategoryReference } from '@commercetools/platform-sdk';

export type PropsWithChildren = {
  children: JSX.Element;
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
  size: string;
  color: string;
  price: number[];
  categoryId: string | null;
}
export interface FilterDataUrl extends FilterData {
  sort: string;
}
