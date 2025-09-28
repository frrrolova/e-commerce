import { renderWithProviders } from '@/utils/test-utils';
import Title from './Title';
import { screen } from '@testing-library/react';

jest.mock('@client/client', () => {
  return null;
});

describe('Title Component', () => {
  test('Data in document is correct', async () => {
    renderWithProviders(<Title title="Hello" />);
    const name = screen.getByText('Hello');
    expect(name).toBeInTheDocument();
  });

  test('Data in document is correct', async () => {
    renderWithProviders(<Title title="World" />);
    const role = screen.getByText('World');
    expect(role).toBeInTheDocument();
  });
});
