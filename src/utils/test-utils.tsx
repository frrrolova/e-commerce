import React, { PropsWithChildren } from 'react';
import { render, screen, within } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';

import type { AppStore, RootState } from '../store/store';
// As a basic setup, import your same slice reducers
import initStore from '../store/store';
import { MemoryRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Cart } from '@commercetools/platform-sdk';
import userEvent from '@testing-library/user-event';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

const mockShop: Cart = {
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

export function renderWithProviders(ui: React.ReactElement, extendedRenderOptions: ExtendedRenderOptions = {}) {
  const {
    preloadedState = {
      cart: mockShop,
    },
    // Automatically create a store instance if no store was passed in
    store = initStore(preloadedState.cart as Cart),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <MemoryRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Provider store={store}>{children}</Provider>
      </LocalizationProvider>
    </MemoryRouter>
  );

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

export async function muiSelectValue(selectTestId: string, optionTestId: string): Promise<void> {
  const dropDown = within(await screen.findByTestId(selectTestId)).getByRole('combobox');
  await userEvent.click(dropDown);
  const option = screen.getByTestId(optionTestId);
  expect(option).toBeInTheDocument();
  await userEvent.click(option);
}
