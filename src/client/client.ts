// import { anonymousFlowCLient } from './buildClient';
import { ByProjectKeyRequestBuilder, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
// import { Client } from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';
import {
  ClientBuilder,
  TokenStore,
  // PasswordAuthMiddlewareOptions,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

const {
  VITE_CTP_PROJECT_KEY,
  VITE_CTP_API_URL,
  VITE_CTP_AUTH_URL,
  VITE_CTP_SCOPES,
  VITE_CTP_CLIENT_ID,
  VITE_CTP_CLIENT_SECRET,
} = import.meta.env;

const projectKey = VITE_CTP_PROJECT_KEY;
const scopes = [VITE_CTP_SCOPES];

// Create apiRoot from the imported ClientBuilder and include your Project key
// export const apiRoot = createApiBuilderFromCtpClient(anonymousFlowCLient).withProjectKey({
//   projectKey: VITE_CTP_PROJECT_KEY,
// });

export enum LSTokenPrefixes {
  ANONYMOUS = 'anonymous',
  LOGGED_IN = 'logged-in',
}

let currentClient: ByProjectKeyRequestBuilder | null = null;

// Configure authMiddlewareOptions
function getMiddlewareOptions(prefix: LSTokenPrefixes): AuthMiddlewareOptions {
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: VITE_CTP_AUTH_URL,
    projectKey: projectKey,
    credentials: {
      clientId: VITE_CTP_CLIENT_ID,
      clientSecret: VITE_CTP_CLIENT_SECRET,
    },
    scopes,
    fetch,
    tokenCache: {
      set(cache) {
        localStorage.setItem(`${prefix}_token`, JSON.stringify(cache));
        if (cache.refreshToken) {
          localStorage.setItem('refresh_token', cache.refreshToken);
        }
      },
      get() {
        const defaultStore = {
          token: '',
          refreshToken: '',
          expirationTime: -1,
        };

        try {
          const tokenObjStrFromLs = localStorage.getItem(`${prefix}_token`);
          if (tokenObjStrFromLs) {
            const tokenObj = JSON.parse(tokenObjStrFromLs) as TokenStore;

            tokenObj.refreshToken = tokenObj.refreshToken || getRefreshTokenFromLocalStorage(prefix);
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

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: VITE_CTP_API_URL,
  fetch,
};

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
// const getProject = () => {
//   return apiRoot.get().execute();
// };

// Retrieve Project information and output the result to the log
// getProject().then(console.log).catch(console.error);

function initNewClient({
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
      .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
      .withPasswordFlow({
        ...getMiddlewareOptions(LSTokenPrefixes.LOGGED_IN),
        credentials: {
          ...getMiddlewareOptions(LSTokenPrefixes.LOGGED_IN).credentials,
          user: {
            password: password,
            username: login,
          },
        },
      })
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware(); // Include middleware for logging

    if (refreshToken) {
      clientBuilder.withRefreshTokenFlow({ ...getMiddlewareOptions(LSTokenPrefixes.LOGGED_IN), refreshToken });
    }

    currentClient = createApiBuilderFromCtpClient(clientBuilder.build()).withProjectKey({
      projectKey: VITE_CTP_PROJECT_KEY,
    });
  } else if (accessToken && refreshToken) {
    const authorization: string = `Bearer ${accessToken}`;
    const clientBuilder = new ClientBuilder()
      .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
      .withExistingTokenFlow(authorization, {
        force: true,
      })
      .withRefreshTokenFlow({ ...getMiddlewareOptions(tokenType), refreshToken })
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware() // Include middleware for logging
      .build();
    currentClient = createApiBuilderFromCtpClient(clientBuilder).withProjectKey({
      projectKey: VITE_CTP_PROJECT_KEY,
    });
  }
}

function getRefreshTokenFromLocalStorage(keyPrefix: LSTokenPrefixes): string | undefined {
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

function getClient(): ByProjectKeyRequestBuilder {
  if (currentClient) {
    return currentClient;
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
    initNewClient({ accessToken: tokenObj.token, refreshToken: getRefreshTokenFromLocalStorage(tokenType), tokenType });
    console.log('existing', tokenType);
    return currentClient as unknown as ByProjectKeyRequestBuilder;
  }
  const clientBuilder = new ClientBuilder()
    .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
    .withAnonymousSessionFlow(getMiddlewareOptions(LSTokenPrefixes.ANONYMOUS))
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware() // Include middleware for logging
    .build();
  currentClient = createApiBuilderFromCtpClient(clientBuilder).withProjectKey({
    projectKey: VITE_CTP_PROJECT_KEY,
  });
  console.log('anon');
  return currentClient;
}

function clearCurrentClient(): void {
  currentClient = null;
}

export default { initNewClient, getClient, clearCurrentClient };
