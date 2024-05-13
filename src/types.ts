export type PropsWithChildren = {
  children: JSX.Element;
};

export interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
}
