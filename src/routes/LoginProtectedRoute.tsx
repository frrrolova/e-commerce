import { Navigate, useLocation } from 'react-router-dom';
import { Paths } from './routeConstants';
import { PropsWithChildren } from '../types';

export function LoginProtectedRoute({ children }: PropsWithChildren) {
  const IsUser = !!localStorage.getItem('user');
  const location = useLocation();

  return !IsUser ? children : <Navigate to={Paths.HOME} replace state={{ path: location.pathname }} />;
}
