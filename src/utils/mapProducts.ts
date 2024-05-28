import { Product as ProductCT } from '@commercetools/platform-sdk';
import { Product } from '@/types';

// Map the commercetools products to UI-product type
export const mapProducts = (prodactsCT: ProductCT[]): Product[] => {
  const products: Product[] = prodactsCT.map((product: ProductCT) => {
    return {
      id: product.id,
      name: product.masterData.current.name[`en-GB`],
      description: product.masterData.current.description?.[`en-GB`] || 'Product has no description',
      images: product.masterData.current.masterVariant.images,
      prices: product.masterData.current.masterVariant.prices,
    };
  });
  return products;
};
