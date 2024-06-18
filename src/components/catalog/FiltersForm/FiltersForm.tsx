import styles from './FiltersForm.module.scss';
import { Box, Button, SelectChangeEvent, Slider, Typography } from '@mui/material';
import { Form, useLoaderData, useSubmit } from 'react-router-dom';
import { ButtonLabels, defaultPriceRange } from './constants';
import { FilterNames, PageData, allOption } from '@/pages/Catalog/constants';
import FormSelect from '@/components/FormSelect/FormSelect';
import { catalogService } from '@/services/catalogService';
import { FormEvent, useEffect, useState } from 'react';
import { FetchProductsResponse, Filter, FilterData } from '@/types';

const FiltersForm = ({ filtersValuesUrl }: { filtersValuesUrl: FilterData }) => {
  const { queryParams } = useLoaderData() as FetchProductsResponse;
  const [filtersData, setFiltersData] = useState<Filter[] | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>(queryParams.filters.size || allOption.TITLE);
  const [selectedColor, setSelectedColor] = useState<string>(queryParams.filters.color || allOption.TITLE);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>(filtersValuesUrl.price || defaultPriceRange);

  const submit = useSubmit();

  const loadFilters = async () => {
    try {
      const resp = await catalogService.fetchFilterAttributes();
      setFiltersData(resp);
    } catch (err) {
      console.error('Failed to fetch filters');
    }
  };

  useEffect(() => {
    loadFilters();
  }, []);

  const applyFilters = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newSearchParams = new URLSearchParams(location.search);

    const formData = new FormData(event.currentTarget);
    const sizeValue = formData.get(FilterNames.SIZE)?.toString().toLowerCase() || '';
    const colorValue = formData.get(FilterNames.COLOR)?.toString().toLowerCase() || '';
    const priceValue = formData.getAll(FilterNames.PRICE)?.toString() || null;

    newSearchParams.set(FilterNames.SIZE, sizeValue);
    newSearchParams.set(FilterNames.COLOR, colorValue);
    if (priceValue) newSearchParams.set(FilterNames.PRICE, priceValue);

    newSearchParams.set(FilterNames.PAGE, '1');

    submit(newSearchParams);
  };

  const clearFilters = async () => {
    const newSearchParams = new URLSearchParams(location.search);

    newSearchParams.delete(FilterNames.SIZE);
    newSearchParams.delete(FilterNames.COLOR);
    newSearchParams.delete(FilterNames.PRICE);

    newSearchParams.set(FilterNames.PAGE, '1');

    submit(newSearchParams);
  };

  const handleSizeChange = (event: SelectChangeEvent) => {
    setSelectedSize(event.target.value as string);
  };

  const handleColorChange = (event: SelectChangeEvent) => {
    setSelectedColor(event.target.value as string);
  };

  const handlePriceRangeChange = (_event: Event, newValue: number | number[]) => {
    setSelectedPriceRange(newValue as number[]);
  };

  useEffect(() => {
    setSelectedSize(queryParams.filters.size || allOption.TITLE);
    setSelectedColor(queryParams.filters.color || allOption.TITLE);
    setSelectedPriceRange(filtersValuesUrl.price);
  }, [filtersValuesUrl.size, filtersValuesUrl.color, filtersValuesUrl.price, queryParams]);

  return (
    <Form
      id="filters-form"
      onSubmit={(event) => {
        applyFilters(event);
      }}
    >
      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
        Filters:
      </Typography>
      {filtersData && (
        <>
          <FormSelect
            label={filtersData[0].label}
            name={filtersData[0].name}
            options={filtersData[0]?.options.map((item) => ({ key: item.key, label: item.label }))}
            value={selectedSize}
            onChange={handleSizeChange}
          />
          <FormSelect
            label={filtersData[1].label}
            name={filtersData[1].name}
            options={filtersData[1]?.options.map((item) => ({ key: item.key, label: item.label }))}
            value={selectedColor}
            onChange={handleColorChange}
          />
          <Box className={styles.priceBox}>
            <Typography variant="body2">{PageData.PRICE_RANGE}</Typography>
            <Slider
              id={FilterNames.PRICE}
              name={FilterNames.PRICE}
              value={selectedPriceRange}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="auto"
              min={defaultPriceRange[0]}
              max={defaultPriceRange[1]}
            />
          </Box>

          <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} type="submit">
            {ButtonLabels.APPLY}
          </Button>

          <Button fullWidth variant="outlined" color="primary" sx={{ mt: 2 }} onClick={clearFilters}>
            {ButtonLabels.CLEAR_FILTER}
          </Button>
        </>
      )}
    </Form>
  );
};

export default FiltersForm;
