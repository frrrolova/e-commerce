import { renderWithProviders } from '@/utils/test-utils';
import { screen, render } from '@testing-library/react';
import About from './About';

jest.mock('@client/client', () => {
  return null;
});

describe('About', () => {
  test('Data in document is correct', async () => {
    const { getByTestId } = renderWithProviders(<About />);

    expect(getByTestId('about')).toBeInTheDocument();
  });
  test('Title in the document is correct', async () => {
    render(<About />);
    const title = screen.getByText('Our team');

    expect(title).toBeInTheDocument();
  });
});
