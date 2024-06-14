import Main from './Main';
import { catalogService } from '@/services/catalogService';
import { waitFor, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import { mockProduct1, mockProduct2, clientMock } from '@/utils/test-client-mock';
import { InfoCardBtn } from './constants';
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
}));

jest.mock('@/services/catalogService', () => {
  const actualCatalogService = jest.requireActual('@/services/catalogService');
  return {
    catalogService: {
      ...actualCatalogService.catalogService,
      fetchProductById: jest.fn(),
      fetchProductsByCategory: jest.fn(),
    },
  };
});

describe('Main component rendering', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (catalogService.fetchProductById as jest.Mock).mockResolvedValue(mockProduct1);
    (catalogService.fetchProductsByCategory as jest.Mock).mockResolvedValue([mockProduct2]);
  });

  test('performs snapshot testing', async () => {
    let tree;
    await act(async () => {
      tree = renderWithProviders(<Main />);
    });

    await waitFor(() => {
      const productElement = screen.getByText('Product Test1');
      expect(productElement).toBeInTheDocument();
    });

    expect(tree).toMatchSnapshot();
  });
});

describe('Header component behavior', () => {
  test('should navigate, when clicking on a section button', async () => {
    const { getByText } = renderWithProviders(<Main />);

    await waitFor(() => {
      const button = getByText(InfoCardBtn.label);

      fireEvent.click(button);
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
