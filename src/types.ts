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
  description: string;
  subHeading: string;
}
