import { apiRoot } from '@/client/client';

export const loginService = (email: string, password: string) => {
  return apiRoot.login().post({ body: { email, password } }).execute();
};
