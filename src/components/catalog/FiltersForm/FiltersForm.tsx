import styles from './FiltersForm.module.scss';
import { Box, Button, SelectChangeEvent, Slider, Typography } from '@mui/material';
import { Form, useLoaderData, useSubmit } from 'react-router-dom';
import { ButtonLabels, defaultPriceRange } from './constants';
import { FilterNames, PageData, allOption } from '@/pages/Catalog/constants';
import FormSelect from '@/components/FormSelect/FormSelect';
import { catalogService } from '@/services/catalogService';
import { FormEvent, useEffect, useState } from 'react';
import { FetchProductsResponse, Filter } from '@/types';

const FiltersForm = () => {
  const { queryParams } = useLoaderData() as FetchProductsResponse;
  const [filtersData, setFiltersData] = useState<Filter[] | null>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    size: queryParams.filters.size || allOption.TITLE,
    color: queryParams.filters.color || allOption.TITLE,
    price: queryParams.filters.price || defaultPriceRange,
  });

  const submit = useSubmit();

  const fetchFilters = async () => {
    try {
      const resp = await catalogService.fetchFilterAttributes();
      setFiltersData(resp);
    } catch (err) {
      console.error('Failed to fetch filters');
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    setSelectedFilters({
      size: queryParams.filters.size || allOption.TITLE,
      color: queryParams.filters.color || allOption.TITLE,
      price: queryParams.filters.price || defaultPriceRange,
    });
  }, [queryParams]);

  const handleFilterChange = (name: string, value: string | number | number[]) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const mapOptions = (index: number) => {
    if (filtersData) {
      return filtersData[index]?.options.map((item) => ({ key: item.key, label: item.label }));
    }
    return [];
  };

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
            options={mapOptions(0)}
            value={selectedFilters.color}
            onChange={(e: SelectChangeEvent) => handleFilterChange(FilterNames.COLOR, e.target.value)}
          />
          <FormSelect
            label={filtersData[1].label}
            name={filtersData[1].name}
            options={mapOptions(1)}
            value={selectedFilters.size}
            onChange={(e: SelectChangeEvent) => handleFilterChange(FilterNames.SIZE, e.target.value)}
          />
          <Box className={styles.priceBox}>
            <Typography variant="body2">{PageData.PRICE_RANGE}</Typography>
            <Slider
              id={FilterNames.PRICE}
              name={FilterNames.PRICE}
              value={selectedFilters.price}
              onChange={(_, value) => handleFilterChange(FilterNames.PRICE, value as number[])}
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
