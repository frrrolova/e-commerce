import { Category } from '@/types';
import { Category as CategorySDK } from '@commercetools/platform-sdk';

export function mapCategories(categoryResponse: CategorySDK[]): Category[] {
  return categoryResponse.map((category) => ({
    id: category.id,
    name: category.name['en-US'],
    key: category.key,
    ancestors: category.ancestors,
    parent: category.parent,
  }));
}
