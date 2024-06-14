import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FilterAttributes } from '@/types';
import { Form, useSubmit } from 'react-router-dom';
import { FormEvent } from 'react';
import { FilterNames } from '@/pages/Catalog/constants';

interface FormSelectProps {
  label: string;
  name: string;
  options: FilterAttributes[];
}

const SortForm: React.FC<FormSelectProps> = ({ label, name, options }) => {
  const submit = useSubmit();

  const handleChange = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const sortValue = formData.get(FilterNames.SORT)?.toString() || '';

    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set(FilterNames.SORT, sortValue);

    submit(newSearchParams);
  };

  return (
    <Box>
      <Form
        id="sort-form"
        onChange={(event) => {
          handleChange(event);
        }}
      >
        <FormControl fullWidth sx={{ mt: 1, mb: 1 }} size="small">
          <InputLabel id={label}>{label}</InputLabel>
          <Select
            labelId={label}
            defaultValue={name}
            label={label}
            native
            inputProps={{
              id: FilterNames.SORT,
              type: 'search',
              name: FilterNames.SORT,
            }}
          >
            {options.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormControl>
      </Form>
    </Box>
  );
};

export default SortForm;
