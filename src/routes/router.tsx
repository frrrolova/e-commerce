import type { RouteObject } from 'react-router-dom';
import { RootLayout } from '@components/RootLayout/RootLayout';
import { Paths } from './routeConstants';
import { AuthProtectedRoute } from './AuthProtectedRoute';
import Main from '@/pages/Main/Main';
import Login from '@/pages/Login/Login';
import Registration from '@/pages/Registration/Registration';
import { Catalog } from '@/pages/Catalog/Catalog';
import Basket from '@/pages/Basket/Basket';
import UserProfile from '@/pages/UserProfile/UserProfile';
import About from '@/pages/About/About';
import Product from '@/pages/Product/Product';
import PageNotFound from '@/pages/PageNotFound/PageNotFound';
import { catalogService } from '@/services/catalogService';

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: Paths.HOME,
        element: <Main />,
      },
      {
        path: Paths.AUTH,
        element: (
          <AuthProtectedRoute>
            <Login />
          </AuthProtectedRoute>
        ),
      },
      {
        path: Paths.REGISTER,
        element: (
          <AuthProtectedRoute>
            <Registration />
          </AuthProtectedRoute>
        ),
      },
      {
        path: Paths.CATALOG,
        element: <Catalog />,
        loader: catalogService.fetchProducts,
      },
      {
        path: Paths.BASKET,
        element: <Basket />,
      },
      {
        path: Paths.ABOUT,
        element: <About />,
      },
      {
        path: Paths.PRODUCTS,
        element: <Product />,
      },
      {
        path: Paths.PROFILE,
        element: (
          <AuthProtectedRoute>
            <UserProfile />
          </AuthProtectedRoute>
        ),
      },
    ],
  },
];
