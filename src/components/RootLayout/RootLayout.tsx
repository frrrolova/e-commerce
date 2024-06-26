import { Outlet } from 'react-router-dom';
import Header from '@components/Header/Header';

export function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
