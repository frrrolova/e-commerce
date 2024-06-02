import client from '@/client/client';

export const loginService = (email: string, password: string) => {
  return client.getClient().login().post({ body: { email, password } }).execute();
};
