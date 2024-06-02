import { Navigate, useLocation } from 'react-router-dom';
import { Paths } from './routeConstants';
import { PropsWithChildren } from '@/types';
import { lsUserKey } from '@/core/commonConstants';

export function AuthProtectedRoute({ children }: PropsWithChildren) {
  const location = useLocation();
  const userFromLS = localStorage.getItem(lsUserKey);
  const IsUser = location.pathname === Paths.PROFILE ? !userFromLS : !!userFromLS;

  return !IsUser ? children : <Navigate to={Paths.HOME} replace state={{ path: location.pathname }} />;
}
