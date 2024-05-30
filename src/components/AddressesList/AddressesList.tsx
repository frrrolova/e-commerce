import { Button, Dialog, List, ListItem } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { Address, BaseAddress } from '@commercetools/platform-sdk';
import { AddressTypes } from '@/enums/auth-form.enum';
import { TCountryCode, getCountryData } from 'countries-list';
import { useState } from 'react';
import AddressForm from '../AddressForm/AddressForm';
import styles from './AddressesList.module.scss';

// import AddressGroup from '../AddressGroup/AddressGroup';
// import { countriesList } from '../RegistrationForm/constants';

interface AddressesListProps {
  addresses: Address[];
  type: AddressTypes;
  title: string;
  onSubmit: (values: BaseAddress, isDefault: boolean, useAsBoth: boolean) => void;
}

function AddressesList({ addresses, type, title, onSubmit }: AddressesListProps) {
  function getAddressString(address: Address) {
    const { apartment, building, streetName, city, country, postalCode } = address;
    const countryValue = getCountryData(country as TCountryCode).name;
    const addressStr = `${streetName} st., ${building}, apt. ${apartment}, ${city}, ${countryValue}, ${postalCode}`;
    return addressStr;
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        {addresses.map((address, id) => (
          <ListItem key={`${type}-${id}`}>
            <PlaceOutlinedIcon sx={{ mr: 1 }} />
            {getAddressString(address)}
          </ListItem>
        ))}
      </List>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddressForm type={type} title={title} onClose={handleClose} onSubmit={onSubmit} />
      </Dialog>
    </>
  );
}

export default AddressesList;
