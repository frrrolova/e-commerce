import { Navigate, useLocation } from 'react-router-dom';
import { Paths } from './routeConstants';
import { PropsWithChildren } from '../types';

export function AuthProtectedRoute({ children }: PropsWithChildren) {
  const isLogged = true;
  const location = useLocation();

  return isLogged ? children : <Navigate to={Paths.AUTH} replace state={{ path: location.pathname }} />;
}
