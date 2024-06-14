import AddressesList from '@/components/AddressesList/AddressesList';
import TabPanel from '@/components/TabPanel/TabPanel';
import { useUserUpdateAction } from '@/core/hooks/useUserUpdateAction';
import { AddressTypes } from '@/enums/auth-form.enum';
import { userAddressUpdateThunk } from '@/store/slices/user/thunks';
import { useAppDispatch } from '@/store/store';
import { Address, BaseAddress, Customer, ErrorObject } from '@commercetools/platform-sdk';
import { Box, Tab, Tabs, TabsOwnProps, useMediaQuery } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SnackBarMsgs, addressesTabsStyles } from '../constants';
import { topSnackbarBasicParams } from '@/shared/snackbarConstans';
import theme from '@/themes/theme';
import { AddressActions } from '@/enums/addressActions.enum';

export function UserAddresses({ userData }: { userData: Customer }) {
  const matches = useMediaQuery('(min-width:600px)');

  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [addressTab, setAddressTab] = useState(0);
  const handleAddressTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setAddressTab(newValue);
  };

  const { makeAction, user, setUser } = useUserUpdateAction(userData);

  function a11yProps(index: number, orientation: TabsOwnProps['orientation'] = 'horizontal') {
    return {
      id: `${orientation}-tab-${index}`,
      'aria-controls': `${orientation}-tabpanel-${index}`,
    };
  }

  const filterAddresses = useCallback(
    (addressIds: string[] = []) => {
      const res: Address[] = [];
      addressIds.forEach((id) => {
        const address = user.addresses?.find((ad) => ad.id === id);
        if (address) {
          res.push(address);
        }
      });
      return res;
    },
    [user.addresses],
  );

  const shippingAddresses: Address[] = useMemo(
    () => filterAddresses(user.shippingAddressIds),
    [user.shippingAddressIds, filterAddresses],
  );

  const billingAddresses: Address[] = useMemo(
    () => filterAddresses(user.billingAddressIds),
    [user.billingAddressIds, filterAddresses],
  );

  useEffect(() => {
    setUser(userData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  function addAddressHandler(value: BaseAddress, isDefault: boolean, useAsBoth: boolean, addressType: AddressTypes) {
    dispatch(userAddressUpdateThunk({ value, version: user.version, addressType, isDefault, useAsBoth }))
      .unwrap()
      .then(() => {
        enqueueSnackbar(SnackBarMsgs.ADDRESS_ADDED, {
          variant: 'success',
          ...topSnackbarBasicParams,
        });
      })
      .catch((e) => {
        const errors: ErrorObject[] = e.body.errors;
        if (errors) {
          errors.forEach((err) => {
            enqueueSnackbar(err.message, {
              variant: 'error',
              ...topSnackbarBasicParams,
            });
          });
        }
      });
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        height: '100%',
        flexDirection: {
          xs: 'column',
          sm: 'row',
        },
      }}
    >
      <Tabs
        orientation={matches ? 'vertical' : 'horizontal'}
        variant="scrollable"
        value={addressTab}
        onChange={handleAddressTabChange}
        aria-label="addresses-tabs"
        sx={{
          borderRight: {
            xs: 0,
            sm: `1px solid ${theme.palette.divider}`,
          },
          borderBottom: {
            xs: `1px solid ${theme.palette.divider}`,
            sm: 0,
          },
          minWidth: {
            xs: '90px',
            md: '110px',
          },
        }}
      >
        <Tab label="Shipping" {...a11yProps(0, 'vertical')} sx={{ ...addressesTabsStyles }} />
        <Tab label="Billing" {...a11yProps(1, 'vertical')} sx={{ ...addressesTabsStyles }} />
      </Tabs>
      <TabPanel value={addressTab} index={0} orientation={matches ? 'vertical' : 'horizontal'}>
        <AddressesList
          addresses={shippingAddresses}
          type={AddressTypes.SHIPPING}
          onSubmit={(address, isDefault, useAsBoth, addressAction, id) => {
            addressAction === AddressActions.CREATE
              ? addAddressHandler(address, isDefault, useAsBoth, AddressTypes.SHIPPING)
              : makeAction({ action: 'changeAddress', addressId: id, address: address }, SnackBarMsgs.ADDRESS_UPDATED);
          }}
          onDefaultClick={(id) => {
            makeAction({ action: 'setDefaultShippingAddress', addressId: id }, SnackBarMsgs.SUCCESS);
          }}
          defaultId={user.defaultShippingAddressId}
          onRemoveClick={(address) => {
            if (!billingAddresses.some((addr) => addr.id === address.id)) {
              makeAction({ action: 'removeAddress', addressId: address.id }, SnackBarMsgs.ADDRESS_REMOVED);
            } else {
              makeAction({ action: 'removeShippingAddressId', addressId: address.id }, SnackBarMsgs.SHIPPING_REMOVED);
            }
          }}
        ></AddressesList>
      </TabPanel>
      <TabPanel value={addressTab} index={1} orientation="vertical">
        <AddressesList
          addresses={billingAddresses}
          type={AddressTypes.BILLING}
          onSubmit={(address, isDefault, useAsBoth, addressAction, id) => {
            addressAction === AddressActions.CREATE
              ? addAddressHandler(address, isDefault, useAsBoth, AddressTypes.BILLING)
              : makeAction({ action: 'changeAddress', addressId: id, address: address }, SnackBarMsgs.ADDRESS_UPDATED);
          }}
          onDefaultClick={(id) => {
            makeAction({ action: 'setDefaultBillingAddress', addressId: id }, SnackBarMsgs.SUCCESS);
          }}
          defaultId={user.defaultBillingAddressId}
          onRemoveClick={(address) => {
            if (!shippingAddresses.some((addr) => addr.id === address.id)) {
              makeAction({ action: 'removeAddress', addressId: address.id }, SnackBarMsgs.ADDRESS_REMOVED);
            } else {
              makeAction({ action: 'removeBillingAddressId', addressId: address.id }, SnackBarMsgs.BILLING_REMOVED);
            }
          }}
        ></AddressesList>
      </TabPanel>
    </Box>
  );
}
