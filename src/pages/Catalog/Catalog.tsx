import styles from './Catalog.module.scss';
import { catalogService } from '@/services/catalogService';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography, Box, Button, Drawer, Slider, Divider, TextField, IconButton } from '@mui/material';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Filter, FilterData, FilterDataUrl, Product } from '@/types';
import FormSelect from '@/components/FormSelect/FormSelect';
import { SelectChangeEvent } from '@mui/material/Select';
import { ButtonLabels, PageData, SortOptions, defaultPriceRange, scrollbarStyles } from './constants';
import useQuery from '@/utils/useQuery';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CategoriesTree from '@/components/CategoriesTree/CategoriesTree';

function Catalog() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filter[] | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>(defaultPriceRange);
  const [sorting, setSorting] = useState<string>(SortOptions[0].key);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const query = useQuery();
  const navigate = useNavigate();

  const loadAllProducts = async (sort = sorting) => {
    try {
      const productData = await catalogService.fetchProducts({ sort });
      setProducts(productData);
    } catch (err) {
      setError('Failed to fetch products');
      console.log('Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  const loadFilteredProducts = async (filters: FilterData, sort = SortOptions[0].key) => {
    try {
      setIsLoading(true);
      const filteredProducts = await catalogService.fetchProducts({
        filters,
        sort,
      });
      setProducts(filteredProducts);
    } catch (err) {
      setError('Failed to fetch filters');
      console.log('Failed to fetch filters');
    } finally {
      setIsLoading(false);
    }
  };

  const loadSearchResults = async (searchQuery: string) => {
    try {
      setIsLoading(true);
      const searchResults = await catalogService.fetchProducts({ search: searchQuery });
      setProducts(searchResults);
    } catch (err) {
      setError('Failed to fetch products');
      console.log('Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const filtersData = await catalogService.fetchFilterAttributes();
        setFilters(filtersData);
      } catch (err) {
        setError('Failed to fetch filters');
        console.log('Failed to fetch filters');
      }
    };

    let size: string = '';
    let color: string = '';
    let price: number[] = defaultPriceRange;
    let sort: string = SortOptions[0].key;
    let search: string = '';
    let filter: string = '';

    const setFiltersFromUrl = async () => {
      try {
        search = query.get('search') || '';
        size = query.get('size') || '';
        color = query.get('color') || '';
        price = query.get('price')?.split(',').map(Number) || defaultPriceRange;
        sort = query.get('sort') || SortOptions[0].key;
        filter = query.get('filter') || '';
        console.log('filter: ', filter);
        if (size) {
          setSelectedSize(size);
        }
        if (color) {
          setSelectedColor(color);
        }
        if (price) {
          setSelectedPriceRange(price);
        }
        if (sort) {
          setSorting(sort);
        }
        if (search) {
          setSearch(search);
        }
        if (filter) {
          setActiveCategory(filter);
        }
      } catch (err) {
        setError('Failed to fetch url params');
        console.log('Failed to fetch url params');
      }
    };

    const fetchInitialProducts = async () => {
      const search = query.get('search') || '';
      const size = query.get('size') || '';
      const color = query.get('color') || '';
      const price = query.get('price')?.split(',').map(Number) || defaultPriceRange;
      const sort = query.get('sort') || SortOptions[0].key;
      const filter = query.get('filter') || '';

      if (search) {
        loadSearchResults(search);
      } else if (
        filter ||
        size ||
        color ||
        (price && (price[0] !== defaultPriceRange[0] || price[1] !== defaultPriceRange[1]))
      ) {
        loadFilteredProducts({ size, color, price, categoryId: filter }, sort);
      } else {
        loadAllProducts(sort);
      }
    };

    loadFilters();
    setFiltersFromUrl();
    fetchInitialProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateUrlWithFilters = (filters: FilterDataUrl) => {
    const queryParams = [];
    if (filters.size) {
      queryParams.push(`size=${filters.size}`);
    }
    if (filters.color) {
      queryParams.push(`color=${filters.color}`);
    }
    if (filters.price[0] != defaultPriceRange[0] || filters.price[1] != defaultPriceRange[1]) {
      queryParams.push(`price=${filters.price[0]},${filters.price[1]}`);
    }
    if (filters.sort) {
      queryParams.push(`sort=${filters.sort}`);
    }
    if (filters.categoryId) {
      queryParams.push(`filter=${filters.categoryId}`);
    }
    if (search) {
      queryParams.push(`search=${search}`);
    }
    navigate('?' + queryParams.join('&'));
  };

  const handleSorting = (event: SelectChangeEvent) => {
    const newSort = event.target.value;
    setSorting(newSort);
    loadFilteredProducts(
      { size: selectedSize, color: selectedColor, price: selectedPriceRange, categoryId: activeCategory },
      newSort,
    );
    updateUrlWithFilters({
      size: selectedSize,
      color: selectedColor,
      price: selectedPriceRange,
      categoryId: activeCategory,
      sort: newSort,
    });
  };

  const handleSize = (event: SelectChangeEvent) => {
    setSelectedSize(event.target.value as string);
  };

  const handleColor = (event: SelectChangeEvent) => {
    setSelectedColor(event.target.value as string);
  };

  const handlePriceRangeChange = (_event: Event, newValue: number | number[]) => {
    setSelectedPriceRange(newValue as number[]);
  };

  const applyFilters = async () => {
    loadFilteredProducts(
      { size: selectedSize, color: selectedColor, price: selectedPriceRange, categoryId: activeCategory },
      sorting,
    );

    updateUrlWithFilters({
      size: selectedSize,
      color: selectedColor,
      price: selectedPriceRange,
      sort: sorting,
      categoryId: activeCategory,
    });
  };

  if (error) return <Typography color="error">{error}</Typography>;

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

  const clearFilters = async () => {
    setSelectedSize('');
    setSelectedColor('');
    setSelectedPriceRange(defaultPriceRange);
    navigate(`?filter=${activeCategory}`);
    // loadAllProducts();
    loadFilteredProducts({ size: '', color: '', price: defaultPriceRange, categoryId: activeCategory }, sorting);
  };

  const clearSearch = async () => {
    setSearch('');
    navigate('');
    loadAllProducts();
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    setSelectedSize('');
    setSelectedColor('');
    setSelectedPriceRange(defaultPriceRange);
    setActiveCategory(null);

    try {
      const results = await catalogService.fetchProducts({ search });
      setProducts(results);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setIsLoading(false);
    }

    navigate(`?search=${search}`);
  };

  const onSelectCategory = async (categoryId: string) => {
    console.log('Category clicked: ', categoryId);
    if (categoryId === 'all') {
      loadAllProducts();
    } else {
      const productsData = await catalogService.fetchProductsByCategory(categoryId);
      setProducts(productsData);
      setActiveCategory(categoryId);

      navigate(`?filter=${categoryId}`);
    }
  };

  const drawer = (
    <Box className={styles.containerFilters}>
      <CategoriesTree onSelectCategory={onSelectCategory} activeCategory={activeCategory} />

      <Divider sx={{ mt: 2, mb: 2 }} />

      <FormSelect
        label={PageData.SORT_LABEL as string}
        value={sorting}
        options={SortOptions}
        onChange={handleSorting}
      />

      <Divider sx={{ mt: 2, mb: 2 }} />

      {/* Filters */}
      <Typography variant="body2">Filters:</Typography>
      {filters && (
        <>
          <FormSelect
            label={filters[0].label}
            value={selectedSize}
            options={filters[0]?.options.map((item) => ({ key: item.key, label: item.label }))}
            onChange={handleSize}
          />
          <FormSelect
            label={filters[1].label}
            value={selectedColor}
            options={filters[1]?.options.map((item) => ({ key: item.key, label: item.label }))}
            onChange={handleColor}
          />
          <Box className={styles.priceBox}>
            <Typography variant="body2">{PageData.PRICE_RANGE}</Typography>
            <Slider
              value={selectedPriceRange}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="auto"
              min={defaultPriceRange[0]}
              max={defaultPriceRange[1]}
            />
          </Box>

          <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={applyFilters}>
            {ButtonLabels.APPLY}
          </Button>

          <Button fullWidth variant="outlined" color="primary" sx={{ mt: 2 }} onClick={clearFilters}>
            {ButtonLabels.CLEAR_FILTER}
          </Button>
        </>
      )}
    </Box>
  );

  return (
    <Box className={styles.container} sx={{ display: 'flex' }}>
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
        className={styles.containerDrawer}
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
        <Grid container justifyContent="space-between" sx={{ mb: 3 }}>
          <Grid>
            <Button variant="text" color="primary" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
              {ButtonLabels.OPEN}
            </Button>
          </Grid>
          <Grid display="flex">
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              placeholder="Search..."
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />

            <Button variant="outlined" color="primary" onClick={clearSearch} sx={{ ml: 2 }}>
              {ButtonLabels.CLEAR}
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {!isLoading && !products.length && <Typography>{PageData.NO_PRODUCTS}</Typography>}
          {products.map((product) => (
            <Grid xs={4} sm={4} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Catalog;
