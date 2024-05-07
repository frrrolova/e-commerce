import '@testing-library/jest-dom';
import Header from './Header';
import { renderWithProviders } from '../../utils/test-utils';

test('renders Header Title', () => {
  const { getByTestId } = renderWithProviders(<Header />);
  const shopNameEl = getByTestId('shop-name');
  expect(shopNameEl.textContent?.trim()).toBe('Plant Shop');
});
