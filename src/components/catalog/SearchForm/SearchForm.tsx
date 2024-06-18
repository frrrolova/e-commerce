import { Button, IconButton, TextField } from '@mui/material';
import { Form, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { SearchButtonParams } from '@/types';
import { ButtonLabels } from './constants';
import { FilterNames } from '@/pages/Catalog/constants';

const SearchForm = ({ value }: SearchButtonParams) => {
  const navigate = useNavigate();

  const clearSearch = async () => {
    navigate('');
  };

  return (
    <>
      <Form id="search-form" role="search">
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Search..."
          defaultValue={value}
          InputProps={{
            id: FilterNames.SEARCH,
            type: 'search',
            name: FilterNames.SEARCH,
            endAdornment: (
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </Form>

      <Button variant="outlined" color="primary" onClick={clearSearch} sx={{ ml: 2 }}>
        {ButtonLabels.CLEAR}
      </Button>
    </>
  );
};

export default SearchForm;
