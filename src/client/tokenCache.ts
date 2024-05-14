import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

class TokenCacheCreator implements TokenCache {
  cache: TokenStore;
  constructor() {
    this.cache = {
      token: '',
      expirationTime: 0,
      refreshToken: '',
    };

    this.get();
  }

  get(): TokenStore {
    const storedToken = localStorage.getItem('CREDENTIALS');
    if (storedToken) {
      this.cache = JSON.parse(storedToken) as TokenStore;
    }
    return this.cache;
  }

  set(cache: TokenStore) {
    this.cache = cache;
    localStorage.setItem('CREDENTIALS', JSON.stringify(this.cache));
  }
}

export const tokenCache = new TokenCacheCreator();
