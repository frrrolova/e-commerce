import '@testing-library/jest-dom';
import Header from './Header';
import { renderWithProviders } from '../../utils/test-utils';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../client/client', () => {
  return null;
});

//Mock for useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Header component rendering', () => {
  test('renders Header Title', () => {
    const { getByTestId } = renderWithProviders(<Header />);
    const shopNameEl = getByTestId('shop-name');
    expect(shopNameEl.textContent?.trim()).toBe('Plant Shop');
  });

  test('performs snapshot testing', () => {
    const tree = renderWithProviders(<Header />);
    expect(tree).toMatchSnapshot();
  });
});

describe('Header component behavior', () => {
  let homeMenuItem: Node | Window;

  test('opens and closes navigation left-menu when clicking on menu icon', async () => {
    const { getByLabelText, getByTestId } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const menuIcon = getByLabelText('account of current user');
    fireEvent.click(menuIcon);

    homeMenuItem = getByTestId('menu-item-Home');
    const menu = getByTestId('menu-left');
    expect(homeMenuItem).toBeInTheDocument();

    fireEvent.click(homeMenuItem);

    await waitFor(() => {
      expect(menu).toHaveStyle('visibility: hidden;');
    });
  });

  test('should navigate, when homeMenuItem is clicked', () => {
    fireEvent.click(homeMenuItem);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
