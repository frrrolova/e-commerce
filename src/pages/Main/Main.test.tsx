import Main from './Main';
import { catalogService } from '@/services/catalogService';
import { promoService } from '@/services/promoService';
import { waitFor, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import { renderWithProviders } from '@/utils/test-utils';
import { InfoCardBtn } from './constants';
import { mockProduct1, mockProduct2, clientMock } from '@/utils/test-client-mock';

// Mock for client
jest.mock('@/client/client', () => ({
  client: jest.fn().mockImplementation(() => clientMock),
}));

// Mock for useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock for catalogService and promoService
jest.mock('@/services/catalogService', () => {
  return {
    catalogService: {
      fetchProductById: jest.fn(),
      fetchProductsByCategory: jest.fn(),
    },
  };
});

jest.mock('@/services/promoService', () => {
  return {
    promoService: {
      fetchPromoCodes: jest.fn(),
    },
  };
});

describe('Main component rendering', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (catalogService.fetchProductById as jest.Mock).mockResolvedValue(mockProduct1);
    (catalogService.fetchProductsByCategory as jest.Mock).mockResolvedValue([mockProduct2]);
    (promoService.fetchPromoCodes as jest.Mock).mockResolvedValue([
      { id: '123', heading: 'Promo Name', imgPath: '/img', description: 'promo description', subHeading: 'promocode' },
    ]);
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
