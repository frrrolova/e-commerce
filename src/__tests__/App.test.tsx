import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('renders App component', () => {
  const { getByTestId } = render(<App />);
  const menuIcon = getByTestId('MenuIcon');
  expect(menuIcon).toBeInTheDocument();
});
