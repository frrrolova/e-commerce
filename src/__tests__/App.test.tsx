import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import App from '../App';
import { Project } from '@commercetools/platform-sdk';
import { mockProduct1, mockProduct2, clientMock } from '@/utils/test-client-mock';
import { catalogService } from '@/services/catalogService';

// Mock for client
jest.mock('../client/client', () => {
  return {
    client: jest.fn().mockImplementation(() => clientMock),
  };
});

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

beforeEach(() => {
  jest.clearAllMocks();

  (catalogService.fetchProductById as jest.Mock).mockResolvedValue(mockProduct1);
  (catalogService.fetchProductsByCategory as jest.Mock).mockResolvedValue([mockProduct2]);
});

test('renders App component', async () => {
  const { getByTestId } = render(<App project={{ name: 'test' } as unknown as Project} />);

  await waitFor(() => {
    const menuIcon = getByTestId('MenuIcon');
    const shopNameEl = getByTestId('shop-name');
    expect(menuIcon).toBeInTheDocument();
    expect(shopNameEl).toBeInTheDocument();
  });
});
