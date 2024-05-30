import { Button, Chip, IconButton, List, ListItem, Typography } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { Address, BaseAddress } from '@commercetools/platform-sdk';
import { AddressTypes } from '@/enums/auth-form.enum';
import { TCountryCode, getCountryData } from 'countries-list';
import { useState } from 'react';
import AddressModalForm from '../AddressModalForm/AddressModalForm';
import styles from './AddressesList.module.scss';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import theme from '@/themes/theme';
import { AddressActions } from '@/enums/addressActions.enum';

// import AddressGroup from '../AddressGroup/AddressGroup';
// import { countriesList } from '../RegistrationForm/constants';

interface AddressesListProps {
  addresses: Address[];
  type: AddressTypes;
  title: string;
  onSubmit: (
    values: BaseAddress,
    isDefault: boolean,
    useAsBoth: boolean,
    addressAction: AddressActions,
    id?: string,
  ) => void;
  defaultId?: string;
  onDefaultClick: (id: string) => void;
}

function AddressesList({ addresses, type, title, onSubmit, defaultId, onDefaultClick }: AddressesListProps) {
  function getAddressString(address: Address) {
    const { apartment, building, streetName, city, country, postalCode } = address;
    const countryValue = getCountryData(country as TCountryCode).name;
    const addressStr = `${streetName} st., ${building}, apt. ${apartment}, ${city}, ${countryValue}, ${postalCode}`;
    return addressStr;
  }

  const [formOpen, setFormOpen] = useState(false);
  const handleOpen = () => setFormOpen(true);
  const handleClose = () => setFormOpen(false);

  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  return (
    <>
      <Button
        variant="contained"
        size="small"
        sx={{
          alignSelf: 'center',
        }}
        startIcon={<AddCircleOutlineOutlinedIcon />}
        onClick={handleOpen}
      >
        Add new address
      </Button>
      <List
        className={styles.scrollableList}
        sx={{
          maxHeight: '300px',
          overflowY: 'auto',
        }}
      >
        {addresses.map((address, ind) => (
          <ListItem
            key={`${type}-${ind}`}
            sx={{ borderBottom: '1px dotted', borderColor: theme.palette.primary.light }}
          >
            <PlaceOutlinedIcon sx={{ mr: 1 }} color="primary" />
            <Typography width="100%" mr={1}>
              {getAddressString(address)}
            </Typography>
            {address.id === defaultId ? (
              <Chip label="default" size="small" color="primary" />
            ) : (
              <Chip
                clickable={true}
                variant="outlined"
                size="small"
                label="set as default"
                onClick={() => {
                  if (address.id) {
                    onDefaultClick(address.id);
                  }
                  console.log('click!!!');
                }}
              />
            )}
            <IconButton
              color="primary"
              size="small"
              onClick={() => {
                setEditingAddress(address);
                handleOpen();
              }}
            >
              <ModeEditOutlineIcon />
            </IconButton>
            <IconButton color="primary" size="small">
              <DeleteOutlinedIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <AddressModalForm
        open={formOpen}
        type={type}
        title={title}
        onClose={() => {
          setEditingAddress(null);
          handleClose();
        }}
        onSubmit={onSubmit}
        address={editingAddress}
      />
    </>
  );
}

export default AddressesList;
