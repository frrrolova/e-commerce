import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

test('renders App component', () => {
  // using MemoryRouter to resolve problem with context of a <Router> component
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const headerElement = getByText('Plant shop');
  expect(headerElement).toBeInTheDocument();
});
