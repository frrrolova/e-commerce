import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('renders App component', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText('Plant shop');
  expect(headerElement).toBeInTheDocument();
});
