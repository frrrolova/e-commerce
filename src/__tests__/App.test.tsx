import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../App';
import { Shop } from '../types';

test('renders App component', () => {
  const { getByTestId } = render(<App shop={{ name: 'test' } as unknown as Shop} />);
  const menuIcon = getByTestId('MenuIcon');
  const shopNameEl = getByTestId('shop-name');
  expect(menuIcon).toBeInTheDocument();
  expect(shopNameEl).toBeInTheDocument();
});
