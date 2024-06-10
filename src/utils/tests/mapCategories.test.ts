import { mapCategories } from '../mapCategories';

describe('mapCategories', () => {
  test('return category object', () => {
    const result = mapCategories([
      {
        id: 'testId',
        version: 1,
        createdAt: 'createdAt',
        lastModifiedAt: 'lastModifiedAt',
        name: { 'en-US': 'name' },
        slug: { slug: 'slug' },
        ancestors: [],
        orderHint: 'orderHint',
        key: 'key',
        parent: { typeId: 'category', id: 'parentId' },
      },
    ]);

    expect(result).toStrictEqual([
      {
        id: 'testId',
        name: 'name',
        key: 'key',
        ancestors: [],
        parent: { typeId: 'category', id: 'parentId' },
      },
    ]);
  });
});
