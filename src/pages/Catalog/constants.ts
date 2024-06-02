import { FilterAttributes } from '@/types';

export enum ButtonLabels {
  APPLY = 'Apply Filters',
  CLEAR_FILTER = 'Clear Filters',
  CLEAR = 'Clear',
  OPEN = 'Sort / Filter',
}

export enum PageData {
  DRAWER_WIDTH = 212,
  DRAWER_TOP = 73,
  NO_PRODUCTS = 'There are no products matching your filters.',
  PRICE_RANGE = 'Price Range',
  SORT_LABEL = 'Sort By',
}

export const defaultPriceRange = [0, 200];

export const SortOptions: FilterAttributes[] = [
  {
    key: 'price-asc',
    label: 'Price Up',
  },
  {
    key: 'price-desc',
    label: 'Price Down',
  },
  {
    key: 'name-asc',
    label: 'Name: A to Z',
  },
];

export const scrollbarStyles = {
  '&::-webkit-scrollbar': {
    width: '4px',
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#262e22',
    borderRadius: '6px',
  },
  '&::-webkit-scrollbar-button:vertical:start:decrement, &::-webkit-scrollbar-button:vertical:end:increment': {
    display: 'none',
  },
};
