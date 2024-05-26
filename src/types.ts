import { Image } from '@commercetools/platform-sdk';

export type PropsWithChildren = {
  children: JSX.Element;
};

export interface Product {
  label: string;
  imgPath: string;
  description: string;
}

export interface InfoDataCard {
  heading: string;
  imgPath: string;
  subHeading: string;
  description?: string;
}

export interface ProductCard {
  id: string;
  name: string;
  description: string;
  images: Image[] | undefined;
}
