import ProductCard from './ProductCard';
import { waitFor, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import { clientMock, mockProduct1 } from '@/utils/test-client-mock';
import { renderWithProviders } from '@/utils/test-utils';

// Mock for client
jest.mock('../../client/client', () => {
  return {
    client: jest.fn().mockImplementation(() => clientMock),
  };
});

//Mock for useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: jest.fn().mockReturnValue({ productId: 'testId' }),
}));

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

// Mock for notistack
jest.mock('notistack', () => ({
  enqueueSnackbar: jest.fn(),
}));

describe('Main component rendering', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('performs snapshot testing', async () => {
    let tree;
    await act(async () => {
      tree = renderWithProviders(<ProductCard product={mockProduct1} />);
    });

    await waitFor(() => {
      const cardElement = screen.getByText(mockProduct1.name);
      expect(cardElement).toBeInTheDocument();
    });

    expect(tree).toMatchSnapshot();
  });
});

describe('Card component behavior', () => {
  test('should navigate, when clicking on a card', async () => {
    const { getByText } = renderWithProviders(<ProductCard product={mockProduct1} />);

    await waitFor(() => {
      const button = getByText(mockProduct1.name);

      fireEvent.click(button);
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
