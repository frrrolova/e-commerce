import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../App';
import { Project } from '@commercetools/platform-sdk';

test('renders App component', () => {
  const { getByTestId } = render(<App project={{ name: 'test' } as unknown as Project} />);
  const menuIcon = getByTestId('MenuIcon');
  const shopNameEl = getByTestId('shop-name');
  expect(menuIcon).toBeInTheDocument();
  expect(shopNameEl).toBeInTheDocument();
});
