import { locale } from '@/core/commonConstants';
import { Product } from '@/types';
import { ProductProjection } from '@commercetools/platform-sdk';

export function mapProductProjections(projections: ProductProjection[]): Product[] {
  return projections.map((projection) => ({
    id: projection.id,
    name: projection.name[locale],
    description: projection.description?.[locale] || 'Product has no description',
    images: projection.masterVariant.images,
    prices: projection.masterVariant.prices,
  }));
}
