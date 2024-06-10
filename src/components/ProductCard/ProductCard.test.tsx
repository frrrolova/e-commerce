import ProductCard from './ProductCard';
// import { catalogService } from '@/services/catalogService';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import { mockProduct1 } from '@/utils/test-client-mock';

// Mock for client
// jest.mock('../../client/client', () => {
//   return {
//     client: jest.fn().mockImplementation(() => clientMock),
//   };
// });

//Mock for useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// jest.mock('@/services/catalogService', () => {
//   const actualCatalogService = jest.requireActual('@/services/catalogService');
//   return {
//     catalogService: {
//       ...actualCatalogService.catalogService,
//       fetchProductById: jest.fn(),
//     },
//   };
// });

describe('Main component rendering', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // (catalogService.fetchProductById as jest.Mock).mockResolvedValue(mockProduct1);
  });

  test('performs snapshot testing', async () => {
    let tree;
    await act(async () => {
      tree = render(<ProductCard product={mockProduct1} />);
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
    const { getByText } = render(<ProductCard product={mockProduct1} />);

    await waitFor(() => {
      const button = getByText(mockProduct1.name);

      fireEvent.click(button);
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
