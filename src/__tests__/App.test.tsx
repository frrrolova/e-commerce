import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../App';
import { Cart } from '@commercetools/platform-sdk';

jest.mock('../client/client', () => {
  return null;
});

test('renders App component', () => {
  const { getByTestId } = render(<App cart={{ name: 'test' } as unknown as Cart} />);
  const menuIcon = getByTestId('MenuIcon');
  const shopNameEl = getByTestId('shop-name');
  expect(menuIcon).toBeInTheDocument();
  expect(shopNameEl).toBeInTheDocument();
});
