import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import { catalogService } from '@/services/catalogService';
import { Category, CategoryTree } from '@/types';
import { useLocation, useSubmit } from 'react-router-dom';
import { CategoryAllNode, FilterNames } from '@/pages/Catalog/constants';

interface CategoriesTreeProps {
  setActiveCategory: (categoryId: string) => void;
  activeCategory: string | null;
}

const CategoriesTree: FC<CategoriesTreeProps> = ({ setActiveCategory, activeCategory }) => {
  const [categoriesTree, setCategoriesTree] = useState<CategoryTree[] | null>(null);

  const submit = useSubmit();
  const location = useLocation();

  const loadCategories = async () => {
    const categoriesData = await catalogService.fetchCategories();

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
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (category: Category) => {
    setActiveCategory(category.id);

    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set(FilterNames.CATEGORY_ID, category.id);
    submit(newSearchParams);
  };

  const renderTree = (nodes: CategoryTree) => (
    <TreeItem
      key={nodes.id}
      itemId={nodes.id}
      label={nodes.name}
      onClick={() => handleClick(nodes)}
      sx={{
        [`& .MuiTreeItem-iconContainer`]: {
          width: 0,
        },
        ...(activeCategory === nodes.id && {
          [`& .MuiTreeItem-content.Mui-selected`]: {
            backgroundColor: 'rgba(68, 140, 68, 0.16)!important',
          },
        }),
        ...(activeCategory !== nodes.id && {
          [`& .MuiTreeItem-content:not(.Mui-selected)`]: {
            backgroundColor: 'transparent!important',
          },
        }),
        ...(activeCategory !== nodes.id && {
          [`& .MuiTreeItem-content:hover`]: {
            backgroundColor: 'rgba(255, 255, 255, 0.08)!important',
          },
        }),
      }}
    >
      {Array.isArray(nodes.subcategories) ? nodes.subcategories.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  const handleItemSelectionToggle = (_event: SyntheticEvent, itemId: string, isSelected: boolean) => {
    if (isSelected) {
      setActiveCategory(itemId);
    }
  };

  return (
    <Stack spacing={1}>
      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
        Categories:{' '}
      </Typography>
      <Box>
        <SimpleTreeView onItemSelectionToggle={handleItemSelectionToggle} sx={{ maxWidth: '100%' }}>
          <TreeItem
            onClick={() => handleClick(CategoryAllNode)}
            key={`${CategoryAllNode.key}`}
            itemId={`${CategoryAllNode.id}`}
            label={`${CategoryAllNode.name}`}
            sx={{
              [`& .MuiTreeItem-content.MuiTreeItem-iconContainer`]: {
                width: 0,
              },
              [`& .MuiTreeItem-iconContainer`]: {
                width: '0!important',
              },
              ...(!activeCategory && {
                [`& .MuiTreeItem-content`]: {
                  backgroundColor: 'rgba(68, 140, 68, 0.16)!important',
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
