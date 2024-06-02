import { useEffect, useState } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import { catalogService } from '@/services/catalogService';
import { Category, CategoryTree } from '@/types';
import React from 'react';

interface CategoriesTreeProps {
  onSelectCategory: (categoryId: string) => void;
}

const CategoriesTree: React.FC<CategoriesTreeProps> = ({ onSelectCategory }) => {
  // const [categories, setCategories] = useState<Category[] | null>(null);
  const [categoriesTree, setCategoriesTree] = useState<CategoryTree[] | null>(null);

  const loadCategories = async () => {
    const categoriesData = await catalogService.fetchCategories();
    // setCategories(categoriesData);
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

  const renderTree = (nodes: CategoryTree) => (
    <TreeItem
      key={nodes.id}
      itemId={nodes.id}
      label={nodes.name}
      sx={{
        [`& .MuiTreeItem-iconContainer`]: {
          width: 0,
        },
      }}
    >
      {Array.isArray(nodes.subcategories) ? nodes.subcategories.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  const handleItemSelectionToggle = (_event: React.SyntheticEvent, itemId: string, isSelected: boolean) => {
    if (isSelected) {
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
            }}
          ></TreeItem>
          {categoriesTree && categoriesTree.map((category) => renderTree(category))}
        </SimpleTreeView>
      </Box>
    </Stack>
  );
};

export default CategoriesTree;
