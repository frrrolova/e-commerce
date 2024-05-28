import { MyCustomerUpdateAction } from '@commercetools/platform-sdk';

export type PropsWithChildren = {
  children: JSX.Element;
};

//TODO correct Product according to CommerceTools fields
export interface Product {
  label: string;
  imgPath: string;
  description: string;
}
//TODO END

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
