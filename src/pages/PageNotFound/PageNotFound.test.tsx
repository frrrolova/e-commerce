import { renderWithProviders } from '@/utils/test-utils';
import PageNotFound from './PageNotFound';

jest.mock('@client/client', () => {
  return null;
});

describe('PageNotFound', () => {
  test('Data in document is correct', async () => {
    const { getByTestId } = renderWithProviders(<PageNotFound />);

    expect(getByTestId('info')).toBeInTheDocument();
  });
});
