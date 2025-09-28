import {
  Box,
  Button,
  Chip,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
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
import ConfirmModal from '../ConfirmModal/ConfirmModal';

interface AddressesListProps {
  addresses: Address[];
  type: AddressTypes;
  onSubmit: (
    values: BaseAddress,
    isDefault: boolean,
    useAsBoth: boolean,
    addressAction: AddressActions,
    id?: string,
  ) => void;
  defaultId?: string;
  onDefaultClick: (id?: string) => void;
  onRemoveClick: (address: BaseAddress) => void;
}

function AddressesList({ addresses, type, onSubmit, defaultId, onDefaultClick, onRemoveClick }: AddressesListProps) {
  function getAddressString(address: Address) {
    const { apartment, building, streetName, city, country, postalCode } = address;
    const countryValue = getCountryData(country as TCountryCode).name;
    const addressStr = `${streetName} st., ${building}, apt. ${apartment}, ${city}, ${countryValue}, ${postalCode}`;
    return addressStr;
  }

  const [formOpen, setFormOpen] = useState(false);
  const handleFormOpen = () => setFormOpen(true);
  const handleFormClose = () => setFormOpen(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const [removingAddress, setRemovingAddress] = useState<Address | null>(null);

  const matches = useMediaQuery('(min-width:600px)');

  return (
    <>
      <Button
        variant="contained"
        size="small"
        sx={{
          alignSelf: 'center',
        }}
        startIcon={<AddCircleOutlineOutlinedIcon />}
        onClick={handleFormOpen}
      >
        Add address
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
            sx={{
              borderBottom: '1px dotted',
              borderColor: theme.palette.primary.light,
              paddingX: {
                xs: 0,
                md: 1,
              },
            }}
          >
            <PlaceOutlinedIcon
              sx={{
                mr: 1,
              }}
              color="primary"
            />
            <Typography
              sx={{
                width: '100%',
                mr: 1,
                fontSize: {
                  xs: '0.9rem',
                  md: '1rem',
                },
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: '2',
              }}
              title={matches ? '' : getAddressString(address)}
            >
              {getAddressString(address)}
            </Typography>
            <Box
              sx={{
                minWidth: '97px',
                display: 'flex',
                justifyContent: 'flex-end',
                mr: 1,
              }}
            >
              {address.id === defaultId ? (
                <Chip
                  clickable={true}
                  label="default"
                  size="small"
                  color="primary"
                  onClick={() => {
                    onDefaultClick();
                  }}
                />
              ) : (
                <Chip
                  clickable={true}
                  variant="outlined"
                  size="small"
                  label="set default"
                  onClick={() => {
                    if (address.id) {
                      onDefaultClick(address.id);
                    }
                  }}
                />
              )}
            </Box>
            <Tooltip title="Edit">
              <IconButton
                color="primary"
                size="small"
                onClick={() => {
                  setEditingAddress(address);
                  handleFormOpen();
                }}
              >
                <ModeEditOutlineIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                color="error"
                size="small"
                onClick={() => {
                  setRemovingAddress(address);
                  handleDialogOpen();
                }}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
      <AddressModalForm
        open={formOpen}
        type={type}
        onClose={() => {
          setEditingAddress(null);
          handleFormClose();
        }}
        onSubmit={onSubmit}
        address={editingAddress}
      />
      <ConfirmModal
        onClose={handleDialogClose}
        open={dialogOpen}
        onConfirm={() => {
          if (removingAddress) {
            onRemoveClick(removingAddress);
            handleDialogClose();
          }
        }}
        onCancel={() => {
          setRemovingAddress(null);
          handleDialogClose();
        }}
      >
        <>
          <DialogTitle color={theme.palette.primary.main} fontWeight={600}>
            {'Are you sure you want to remove this address?'}
          </DialogTitle>
          <DialogContent sx={{ letterSpacing: '0.05em' }}>
            {removingAddress ? getAddressString(removingAddress) : ''}
          </DialogContent>
        </>
      </ConfirmModal>
    </>
  );
}

export default AddressesList;
