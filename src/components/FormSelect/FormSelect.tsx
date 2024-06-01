import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FilterAttributes } from '@/types';

interface FormSelectProps {
  label: string;
  value: string;
  options: FilterAttributes[];
  onChange: (event: SelectChangeEvent) => void;
}

const FormSelect: React.FC<FormSelectProps> = ({ label, value, options, onChange }) => {
  return (
    <Box>
      <FormControl fullWidth sx={{ mt: 1, mb: 1 }} size="small">
        <InputLabel id="select-label">{label}</InputLabel>
        <Select labelId="select-label" id="select" value={value} label={label} onChange={onChange}>
          {options.map((option) => (
            <MenuItem key={option.key} value={option.key}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FormSelect;
