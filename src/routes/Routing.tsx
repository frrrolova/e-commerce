import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './router';
import { useAppDispatch } from '@/store/store';
import { useEffect } from 'react';
import { lsUserKey } from '@/core/commonConstants';
import { setUser } from '@/store/slices/user/userSlice';

const BrowserRouter = createBrowserRouter(routes);

function Routing() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    window.addEventListener('storage', (e) => {
      if ([null, lsUserKey].includes(e.key)) {
        if (e.key === null) {
          dispatch(setUser(null));
        } else if (e.key === lsUserKey) {
          if (e.newValue) {
            dispatch(setUser(JSON.parse(e.newValue)));
          } else {
            dispatch(setUser(null));
          }
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <RouterProvider router={BrowserRouter} />;
}

export default Routing;
