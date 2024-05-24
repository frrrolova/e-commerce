import { Image } from '@commercetools/platform-sdk';

export type PropsWithChildren = {
  children: JSX.Element;
};

export interface Product {
  id: string;
  name: string;
  description: string;
  images: Image[] | undefined;
}

export interface InfoDataCard {
  heading: string;
  imgPath: string;
  subHeading: string;
  description?: string;
}
