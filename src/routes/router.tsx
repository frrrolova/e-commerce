import type { RouteObject } from 'react-router-dom';
import { RootLayout } from '../components/RootLayout/RootLayout';
import { Paths } from './routeConstants';
import { AuthProtectedRoute } from './AuthProtectedRoute';
import Main from '../pages/Main/Main';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';
import Catalog from '../pages/Catalog/Catalog';
import Basket from '../pages/Basket/Basket';
import UserProfile from '../pages/UserProfile/UserProfile';
import About from '../pages/About/About';

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      {
        path: Paths.HOME,
        element: <Main />,
      },
      {
        path: Paths.AUTH,
        element: <Login />,
      },
      {
        path: Paths.REGISTER,
        element: <Registration />,
      },
      {
        path: Paths.CATALOG,
        element: <Catalog />,
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