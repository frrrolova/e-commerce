import client from '@/client/client';

export const loginService = (email: string, password: string) => {
  // return apiRoot.login().post({ body: { email, password } }).execute();
  return client.getClient().login().post({ body: { email, password } }).execute();
};
