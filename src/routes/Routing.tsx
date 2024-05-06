import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './router';

const BrowserRouter = createBrowserRouter(routes);

function Routing() {
  return <RouterProvider router={BrowserRouter} />;
}

export default Routing;
