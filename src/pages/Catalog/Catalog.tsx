import { catalogService } from '@/services/catalogService';
import { SyntheticEvent, useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Typography,
  Box,
  Button,
  Drawer,
  Divider,
  Breadcrumbs,
  Link,
  Pagination,
  PaginationItem,
  CircularProgress,
} from '@mui/material';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Category, FetchProductsResponse } from '@/types';
import { ButtonLabels, CategoryAllNode, FilterNames, PageData, SortOptions, scrollbarStyles } from './constants';
import { useLoaderData, useLocation, useSubmit, Link as PageLink } from 'react-router-dom';
import CategoriesTree from '@/components/catalog/CategoriesTree/CategoriesTree';
import SearchForm from '@/components/catalog/SearchForm/SearchForm';
import SortForm from '@/components/catalog/SortForm/SortForm';
import FiltersForm from '@/components/catalog/FiltersForm/FiltersForm';

export function Catalog() {
  const { products, pagination, queryParams } = useLoaderData() as FetchProductsResponse;

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<Category[]>([CategoryAllNode]);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const submit = useSubmit();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const page = parseInt(query.get('page') || '1', 10);

  const fetchBreadcrumbs = async (categoryId: string | null) => {
    if (!categoryId) {
      setBreadcrumbs([CategoryAllNode]);
      return;
    }

    const crumbs = [];
    try {
      const categoriesData = await catalogService.fetchCategories();
      let currCat = categoriesData.find((category) => category.id === categoryId);

      if (!currCat) {
        return;
      }

      crumbs.unshift(currCat);
      let currParent = currCat.parent;
      while (currParent?.id) {
        currCat = categoriesData.find((category) => category.id === currParent?.id);
        if (currCat) {
          crumbs.unshift(currCat);
          currParent = currCat.parent;
        } else {
          break;
        }
      }
      setBreadcrumbs(crumbs);
    } catch (err) {
      // setError('Failed to fetch breadcrumb data');
      console.log('Failed to fetch breadcrumb data');
    }
  };

  useEffect(() => {
    fetchBreadcrumbs(activeCategory);
  }, [activeCategory]);

  // if (error) return <Typography color="error">{error}</Typography>;

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleBreadcrumbClick = (category: Category) => (e: SyntheticEvent) => {
    e.preventDefault();
    setActiveCategory(category.id);

    query.set(FilterNames.CATEGORY_ID, category.id);
    query.set(FilterNames.PAGE, '1');

    submit(query);
  };

  const drawer = (
    <Box>
      {/* Categories */}
      <CategoriesTree setActiveCategory={setActiveCategory} activeCategory={activeCategory} />

      <Divider sx={{ mt: 2, mb: 2 }} />

      {/* Sort By */}
      <SortForm label={PageData.SORT_LABEL as string} name={queryParams.sort} options={SortOptions} />

      <Divider sx={{ mt: 2, mb: 2 }} />

      {/* Filters */}
      <FiltersForm filtersValuesUrl={queryParams.filters} />
    </Box>
  );

  useEffect(() => {
    //set Search from URL
    const searchBtn: HTMLButtonElement = document.getElementById('search') as HTMLButtonElement;
    if (!searchBtn) throw new Error('Button Search not found');
    searchBtn.value = queryParams.search;

    //set Sort from URL
    const sortEl: HTMLSelectElement = document.getElementById('sort') as HTMLSelectElement;
    if (!sortEl) throw new Error('Element Sort not found');
    sortEl.value = queryParams.sort;

    // set ActiveCategory from URL
    setActiveCategory(queryParams.filters.categoryId);
  }, [queryParams]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: PageData.DRAWER_WIDTH, padding: '1.5rem' },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: PageData.DRAWER_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            zIndex: 1099,
            top: PageData.DRAWER_TOP,
            width: PageData.DRAWER_WIDTH,
            maxHeight: 'calc(100% - 70px)',
            boxSizing: 'border-box',
            padding: '0 1.5rem 1.5rem 1.5rem',
            backgroundColor: 'transparent',
            ...scrollbarStyles,
          },
        }}
        open
      >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {catalogService.loading === true ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container xs={12} sx={{ mb: 2 }}>
              <Grid>
                {breadcrumbs.length > 0 && (
                  <Breadcrumbs aria-label="breadcrumb">
                    {breadcrumbs.map((category, index) => (
                      <Link
                        key={category.id}
                        underline="hover"
                        color={index === breadcrumbs.length - 1 ? 'text.primary' : 'inherit'}
                        href={`/catalog?filter=${category.id}`}
                        onClick={handleBreadcrumbClick(category)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </Breadcrumbs>
                )}
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between" sx={{ mb: 3 }}>
              <Grid>
                <Button
                  variant="text"
                  color="primary"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: 'none' } }}
                >
                  {ButtonLabels.OPEN}
                </Button>
              </Grid>
              <Grid display="flex">
                <SearchForm value={queryParams.search} />
              </Grid>
            </Grid>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, md: 12 }}>
              {!products.length && <Typography>{PageData.NO_PRODUCTS}</Typography>}
              {products.map((product) => (
                <Grid xs={4} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
            {!!products.length && (
              <Grid sx={{ mt: 4 }}>
                <Pagination
                  page={page}
                  count={pagination.pageAmount}
                  renderItem={(item) => {
                    const newQuery = new URLSearchParams(query.toString());
                    newQuery.set('page', item.page?.toString() || '1');
                    return <PaginationItem component={PageLink} to={`?${newQuery.toString()}`} {...item} />;
                  }}
                />
              </Grid>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
