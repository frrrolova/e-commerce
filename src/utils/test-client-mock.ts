import { Category, Product, PromoData } from '@/types';

export const mockProduct1: Product = {
  id: '1',
  name: 'Product Test1',
  description: 'Description 1',
  images: [{ url: 'image.png', dimensions: { w: 200, h: 200 } }],
  prices: [{ id: '1', value: { type: 'centPrecision', centAmount: 2000, currencyCode: 'EUR', fractionDigits: 2 } }],
};

export const mockProduct2: Product = {
  id: '2',
  name: 'Product Test2',
  description: 'Description 2',
  images: [{ url: 'image2.png', dimensions: { w: 200, h: 200 } }],
  prices: [{ id: '2', value: { type: 'centPrecision', centAmount: 2000, currencyCode: 'EUR', fractionDigits: 2 } }],
};

export const mockCategoryParent: Category = {
  id: '3',
  name: 'Category Parent',
  key: 'category-parent-key',
  ancestors: [],
  parent: undefined,
};

export const mockCategoryChild: Category = {
  id: '4',
  name: 'Category Child',
  key: 'category-child-key',
  ancestors: [{ typeId: 'category', id: '3' }],
  parent: { typeId: 'category', id: '3' },
};

export const mockPromoData: PromoData = {
  id: '123',
  heading: 'Promo Name',
  imgPath: '/img',
  description: 'promo description',
  subHeading: 'promocode',
};

export const clientMock = () => ({
  getClient: () => ({
    productProjections: () => ({
      search: () => ({
        get: jest.fn().mockReturnValue({
          execute: jest.fn().mockResolvedValue({ body: { results: [mockProduct2] } }),
        }),
      }),
      withId: () => ({
        get: jest.fn().mockReturnValue({
          execute: jest.fn().mockResolvedValue({ body: mockProduct1 }),
        }),
      }),
      get: jest.fn().mockReturnValue({
        execute: jest.fn().mockResolvedValue({ body: { results: [mockProduct2] } }),
      }),
    }),
    productTypes: () => ({
      get: jest.fn().mockReturnValue({
        execute: jest.fn().mockResolvedValue({ body: { results: [] } }),
      }),
    }),
    categories: () => ({
      get: jest.fn().mockReturnValue({
        execute: jest.fn().mockResolvedValue({ body: { results: [mockCategoryParent, mockCategoryChild] } }),
      }),
    }),
    cartDiscounts: () => ({
      get: jest.fn().mockReturnValue({
        execute: jest.fn().mockResolvedValue({ body: { results: [mockPromoData] } }),
      }),
    }),
  }),
});
