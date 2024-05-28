import { Product } from '@/types';
import { ProductProjection } from '@commercetools/platform-sdk';

export function mapProductProjections(projections: ProductProjection[]): Product[] {
  return projections.map((projection) => ({
    id: projection.id,
    name: projection.name['en-GB'],
    description: projection.description?.['en-GB'] || 'Product has no description',
    images: projection.masterVariant.images,
    prices: projection.masterVariant.prices,
  }));
}
