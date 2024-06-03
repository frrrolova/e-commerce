import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import { catalogService } from '@/services/catalogService';
import { Category, CategoryTree } from '@/types';
// import useQuery from '@/utils/useQuery';

interface CategoriesTreeProps {
  onSelectCategory: (categoryId: string) => void;
  activeCategory: string | null;
}

const CategoriesTree: FC<CategoriesTreeProps> = ({ onSelectCategory, activeCategory }) => {
  // const [categories, setCategories] = useState<Category[] | null>(null);
  const [categoriesTree, setCategoriesTree] = useState<CategoryTree[] | null>(null);
  // const [activeItem, setActiveItem] = useState<string | null>(null);
  // const query = useQuery();
  // const categoryFromUrl = query.get('filter') || '';
  // console.log('!!filter in tree', categoryFromUrl);

  const loadCategories = async () => {
    const categoriesData = await catalogService.fetchCategories();
    // console.log('categoriesData in tree', categoriesData);
    sortSubcategories(categoriesData);
  };

  const sortSubcategories = (categories: Category[]) => {
    const parentCategories = categories.filter((category) => !category.parent);

    const sortedCategories = parentCategories.map((parent) => ({
      ...parent,
      subcategories: categories.filter((category) => category.parent?.id === parent.id),
    }));
    setCategoriesTree(sortedCategories);
  };

  useEffect(() => {
    console.log('in Tree: ', activeCategory);
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTree = (nodes: CategoryTree) => (
    <TreeItem
      key={nodes.id}
      itemId={nodes.id}
      label={nodes.name}
      sx={{
        [`& .MuiTreeItem-iconContainer`]: {
          width: 0,
        },
        ...(activeCategory === null && {
          [`& .MuiTreeItem-content`]: {
            backgroundColor: 'transparent!important',
          },
        }),
        // ...(categoryFromUrl === nodes.id && {
        //   [`& .MuiTreeItem-content`]: {
        //     backgroundColor: 'rgba(68, 140, 68, 0.16)!important',
        //   },
        // }),
      }}
    >
      {Array.isArray(nodes.subcategories) ? nodes.subcategories.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  const handleItemSelectionToggle = (_event: SyntheticEvent, itemId: string, isSelected: boolean) => {
    if (isSelected) {
      // setActiveItem(itemId);
      onSelectCategory(itemId);
    }
  };

  return (
    <Stack spacing={1}>
      <Typography>Categories: </Typography>
      <Box>
        <SimpleTreeView onItemSelectionToggle={handleItemSelectionToggle} sx={{ maxWidth: '100%' }}>
          <TreeItem
            key="all"
            itemId="all"
            label="All Plants"
            sx={{
              [`& .MuiTreeItem-content.MuiTreeItem-iconContainer`]: {
                width: 0,
              },
              [`& .MuiTreeItem-iconContainer`]: {
                width: '0!important',
              },
              ...(activeCategory == null && {
                [`& .MuiTreeItem-content`]: {
                  backgroundColor: 'rgba(68, 140, 68, 0.16)',
                },
              }),
            }}
          ></TreeItem>
          {categoriesTree && categoriesTree.map((category) => renderTree(category))}
        </SimpleTreeView>
      </Box>
    </Stack>
  );
};

export default CategoriesTree;
