import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FilterAttributes } from '@/types';
import { allOption } from '@/pages/Catalog/constants';

interface FormSelectProps {
  label: string;
  name: string;
  options: FilterAttributes[];
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  typeProps?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({ label, name, options, value, onChange, typeProps }) => {
  return (
    <FormControl fullWidth sx={{ mt: 1, mb: 1 }} size="small">
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        labelId={label}
        id={`${label}-select`}
        value={value}
        onChange={onChange}
        label={label}
        native
        inputProps={{
          id: name,
          type: typeProps,
          name: name,
        }}
      >
        <option value={allOption.TITLE}>{allOption.TITLE}</option>
        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default FormSelect;
