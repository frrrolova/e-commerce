import { ByProjectKeyRequestBuilder, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import fetch from 'node-fetch';
import {
  ClientBuilder,
  TokenStore,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';
import { LSTokenPrefixes } from '@/enums/ls.enums';

const {
  VITE_CTP_PROJECT_KEY,
  VITE_CTP_API_URL,
  VITE_CTP_AUTH_URL,
  VITE_CTP_SCOPES,
  VITE_CTP_CLIENT_ID,
  VITE_CTP_CLIENT_SECRET,
} = import.meta.env;

class Client {
  private currentClient: ByProjectKeyRequestBuilder | null = null;

  private projectKey = VITE_CTP_PROJECT_KEY;
  private scopes = [VITE_CTP_SCOPES];

  // Configure httpMiddlewareOptions
  private httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: VITE_CTP_API_URL,
    fetch,
  };

  public initNewClient({
    login,
    password,
    accessToken,
    refreshToken,
    tokenType,
  }: {
    login?: string;
    password?: string;
    accessToken?: string;
    refreshToken?: string;
    tokenType: LSTokenPrefixes;
  }) {
    if (login && password) {
      localStorage.removeItem(`${LSTokenPrefixes.ANONYMOUS}_token`);

      const clientBuilder = new ClientBuilder()
        .withProjectKey(this.projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
        .withPasswordFlow({
          ...this.getMiddlewareOptions(LSTokenPrefixes.LOGGED_IN),
          credentials: {
            ...this.getMiddlewareOptions(LSTokenPrefixes.LOGGED_IN).credentials,
            user: {
              password: password,
              username: login,
            },
          },
        })
        .withHttpMiddleware(this.httpMiddlewareOptions)
        .withLoggerMiddleware(); // Include middleware for logging

      if (refreshToken) {
        clientBuilder.withRefreshTokenFlow({ ...this.getMiddlewareOptions(LSTokenPrefixes.LOGGED_IN), refreshToken });
      }

      this.currentClient = createApiBuilderFromCtpClient(clientBuilder.build()).withProjectKey({
        projectKey: VITE_CTP_PROJECT_KEY,
      });
    } else if (accessToken && refreshToken) {
      const authorization: string = `Bearer ${accessToken}`;
      const clientBuilder = new ClientBuilder()
        .withProjectKey(this.projectKey)
        .withExistingTokenFlow(authorization, {
          force: true,
        })
        .withRefreshTokenFlow({ ...this.getMiddlewareOptions(tokenType), refreshToken })
        .withHttpMiddleware(this.httpMiddlewareOptions)
        .withLoggerMiddleware()
        .build();
      this.currentClient = createApiBuilderFromCtpClient(clientBuilder).withProjectKey({
        projectKey: VITE_CTP_PROJECT_KEY,
      });
    }
  }

  public getClient(): ByProjectKeyRequestBuilder {
    if (this.currentClient) {
      return this.currentClient;
    }
    let tokenType: LSTokenPrefixes = LSTokenPrefixes.ANONYMOUS;
    let lsToken: string | null = null;

    if (localStorage.getItem(`${LSTokenPrefixes.LOGGED_IN}_token`)) {
      tokenType = LSTokenPrefixes.LOGGED_IN;
      lsToken = localStorage.getItem(`${LSTokenPrefixes.LOGGED_IN}_token`);
    } else if (localStorage.getItem(`${LSTokenPrefixes.ANONYMOUS}_token`)) {
      tokenType = LSTokenPrefixes.ANONYMOUS;
      lsToken = localStorage.getItem(`${LSTokenPrefixes.ANONYMOUS}_token`);
    }

    if (lsToken) {
      const tokenObj: TokenStore = JSON.parse(lsToken);
      this.initNewClient({
        accessToken: tokenObj.token,
        refreshToken: this.getRefreshTokenFromLocalStorage(tokenType),
        tokenType,
      });
      return this.currentClient as unknown as ByProjectKeyRequestBuilder;
    }
    const clientBuilder = new ClientBuilder()
      .withProjectKey(this.projectKey)
      .withAnonymousSessionFlow(this.getMiddlewareOptions(LSTokenPrefixes.ANONYMOUS))
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
    this.currentClient = createApiBuilderFromCtpClient(clientBuilder).withProjectKey({
      projectKey: VITE_CTP_PROJECT_KEY,
    });
    return this.currentClient;
  }

  public clearCurrentClient(): void {
    this.currentClient = null;
  }

  private getMiddlewareOptions(prefix: LSTokenPrefixes): AuthMiddlewareOptions {
    const authMiddlewareOptions: AuthMiddlewareOptions = {
      host: VITE_CTP_AUTH_URL,
      projectKey: this.projectKey,
      credentials: {
        clientId: VITE_CTP_CLIENT_ID,
        clientSecret: VITE_CTP_CLIENT_SECRET,
      },
      scopes: this.scopes,
      fetch,
      tokenCache: {
        set: (cache) => {
          localStorage.setItem(`${prefix}_token`, JSON.stringify(cache));
          if (cache.refreshToken) {
            localStorage.setItem('refresh_token', cache.refreshToken);
          }
        },
        get: () => {
          const defaultStore = {
            token: '',
            refreshToken: '',
            expirationTime: -1,
          };

          try {
            const tokenObjStrFromLs = localStorage.getItem(`${prefix}_token`);
            if (tokenObjStrFromLs) {
              const tokenObj = JSON.parse(tokenObjStrFromLs) as TokenStore;

              tokenObj.refreshToken = tokenObj.refreshToken || this.getRefreshTokenFromLocalStorage(prefix);
              return tokenObj;
            }
          } catch {
            // do nothing
          }
          return defaultStore;
        },
      },
    };
    return authMiddlewareOptions;
  }

  private getRefreshTokenFromLocalStorage(keyPrefix: LSTokenPrefixes): string | undefined {
    const tokenObjStr = localStorage.getItem(`${keyPrefix}_token`);

    if (tokenObjStr) {
      try {
        const refreshTokenFromTokenObj = (JSON.parse(tokenObjStr) as TokenStore).refreshToken;

        return refreshTokenFromTokenObj ?? localStorage.getItem('refresh_token') ?? undefined;
      } catch (e) {
        // do nothing
      }
    }

    return;
  }
}

const client = new Client();

export default client;
