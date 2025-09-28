import { renderWithProviders } from '@/utils/test-utils';
import Product from './Product';
import { waitFor } from '@testing-library/react';

jest.mock('@client/client', () => {
  return null;
});

jest.mock('@/services/productService', function () {
  return {
    productService: {
      fetchProduct: jest.fn().mockResolvedValue({
        id: 'testId',
        name: 'testName',
        description: 'testDescription',
        images: [
          {
            url: 'testUrl',
            label: 'testLabel',
          },
        ],
        prices: [
          {
            value: {
              centAmount: 1000,
            },
            discounted: {
              value: {
                centAmount: 500,
              },
            },
          },
        ],
      }),
    },
  };
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ productId: 'testId' }),
}));

describe('Product', () => {
  test('Data in document is correct', async () => {
    const { getByTestId } = renderWithProviders(<Product />);

    await waitFor(() => {
      expect(getByTestId('product-name').textContent).toBe('testName');
      expect(getByTestId('product-description').textContent).toBe('testDescription');
    });
  });
});
