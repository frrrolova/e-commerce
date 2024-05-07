import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';

import type { AppStore, RootState } from '../store/store';
// As a basic setup, import your same slice reducers
import initStore from '../store/store';
import { Shop } from '../types';
import { MemoryRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

const mockShop: Shop = {
  id: '123456',
  countries: [],
  createdAt: new Date().toISOString(),
  languages: [],
  lastModifiedAt: new Date().toISOString(),
  distributionChannels: [],
  key: 'test-key',
  productSelections: [],
  supplyChannels: [],
  version: 2,
  name: { en: 'Plant Shop' },
};

export function renderWithProviders(ui: React.ReactElement, extendedRenderOptions: ExtendedRenderOptions = {}) {
  const {
    preloadedState = {
      shop: mockShop,
    },
    // Automatically create a store instance if no store was passed in
    store = initStore(preloadedState.shop as Shop),
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
