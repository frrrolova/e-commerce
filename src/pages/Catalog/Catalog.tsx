import styles from './Catalog.module.scss';
import { catalogService } from '@/services/catalogService';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography, Box, Button, Drawer, Slider } from '@mui/material';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Filter, Product } from '@/types';
import FormSelect from '@/components/FormSelect/FormSelect';
import { SelectChangeEvent } from '@mui/material/Select';
import { ButtonLabels, PageData } from './constants';

function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filter[] | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([0, 200]);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productData = await catalogService.fetchProducts();
        const filtersData = await catalogService.fetchFilterAttributes();

        setProducts(productData);
        setFilters(filtersData);
      } catch (err) {
        setError('Failed to fetch products');
        console.log('Failed to fetch products');
      } finally {
        console.log('Data is fetched');
      }
    };

    loadProducts();
  }, []);

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
    try {
      const filteredProducts = await catalogService.fetchProducts({
        filters: { size: selectedSize, color: selectedColor, price: selectedPriceRange },
      });
      setProducts(filteredProducts);
    } catch (err) {
      setError('Failed to apply filters');
      console.log('Failed to apply filters');
    }
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
    setSelectedPriceRange([0, 200]);
    try {
      const productData = await catalogService.fetchProducts();
      setProducts(productData);
    } catch (err) {
      setError('Failed to clear filters');
      console.log('Failed to clear filters');
    }
  };

  const drawer = (
    <Box className={styles.containerFilters} sx={{ overflow: 'auto' }}>
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
              min={0}
              max={200}
            />
          </Box>

          <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={applyFilters}>
            {ButtonLabels.APPLY}
          </Button>

          <Button fullWidth variant="outlined" color="primary" sx={{ mt: 2 }} onClick={clearFilters}>
            {ButtonLabels.CLEAR}
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
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: PageData.DRAWER_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            zIndex: 1099,
            top: PageData.DRAWER_TOP,
            width: PageData.DRAWER_WIDTH,
            boxSizing: 'border-box',
            padding: '1.5rem',
            backgroundColor: 'transparent',
          },
        }}
        open
      >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Grid container>
          <Grid>
            <Button variant="text" color="primary" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
              {ButtonLabels.OPEN}
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {!products.length && <Typography>{PageData.NO_PRODUCTS}</Typography>}
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
