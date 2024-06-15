import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import App from '../App';
import { Cart } from '@commercetools/platform-sdk';
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

const cartMock = {
  id: 'testId',
  version: 1,
  lineItems: [],
  customLineItems: [],
  totalPrice: {
    type: 'centPrecision',
    currencyCode: 'EUR',
    centAmount: 4200,
    fractionDigits: 2,
  },
  taxMode: 'Platform',
  taxRoundingMode: 'HalfEven',
  taxCalculationMode: 'LineItemLevel',
  inventoryMode: 'None',
  cartState: 'Active',
  shippingMode: 'Single',
  shipping: [],
  itemShippingAddresses: [],
  discountCodes: [],
  directDiscounts: [],
  refusedGifts: [],
  origin: 'Customer',
  createdAt: '2018-10-12T14:00:00.000Z',
  lastModifiedAt: '2018-10-12T14:00:00.000Z',
};

beforeEach(() => {
  jest.clearAllMocks();

  (catalogService.fetchProductById as jest.Mock).mockResolvedValue(mockProduct1);
  (catalogService.fetchProductsByCategory as jest.Mock).mockResolvedValue([mockProduct2]);
});

test('renders App component', async () => {
  const { getByTestId } = render(<App cart={cartMock as unknown as Cart} />);

  await waitFor(() => {
    const menuIcon = getByTestId('MenuIcon');
    const shopNameEl = getByTestId('shop-name');
    expect(menuIcon).toBeInTheDocument();
    expect(shopNameEl).toBeInTheDocument();
  });
});
