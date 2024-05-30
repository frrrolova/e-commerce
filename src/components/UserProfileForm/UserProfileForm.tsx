import { Address, BaseAddress, Customer, ErrorObject, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { Box, Tab, Tabs, TabsOwnProps } from '@mui/material';
import EditableInput from '../EditableInput/EditableInput';
import { AddressTypes, FieldNames } from '@/enums/auth-form.enum';
import { formFieldsConfig } from '@/shared/auth-form.constants';
import { dateOfBirthSchema, emailSchema, firstNameSchema, lastNameSchema } from '@/core/commonValidation';
import EditableDatePicker from '../EditableDatepicker/EditableDatepicker';
import { useAppDispatch } from '@/store/store';
import { userAddressUpdateThunk, userUpdateThunk } from '@/store/slices/user/thunks';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { snackbarBasicParams } from '@/shared/snackbarConstans';
import { getFormattedDateValue } from '@/utils/getFormattedDateValue';
import TabPanel from '../TabPanel/TabPanel';
import AddressesList from '../AddressesList/AddressesList';
import { AddressActions } from '@/enums/addressActions.enum';
import { SnackBarMsgs } from './constants';

function UserProfileForm({ userData }: { userData: Customer }) {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [user, setUser] = useState<Customer>(userData);

  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const [addressTab, setAddressTab] = useState(0);
  const handleAddressTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setAddressTab(newValue);
  };

  function a11yProps(index: number, orientation: TabsOwnProps['orientation'] = 'horizontal') {
    return {
      id: `${orientation}-tab-${index}`,
      'aria-controls': `${orientation}-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  function actionHandler(updAction: MyCustomerUpdateAction, successMsg: SnackBarMsgs = SnackBarMsgs.SUCCESS) {
    return dispatch(
      userUpdateThunk({
        updAction,
        version: user.version,
      }),
    )
      .unwrap()
      .then(() => {
        enqueueSnackbar(successMsg, {
          variant: 'success',
          ...snackbarBasicParams,
        });
      })
      .catch((e) => {
        setUser(userData);
        const errors: ErrorObject[] = e.body.errors;
        if (errors) {
          errors.forEach((err) => {
            enqueueSnackbar(err.message, {
              variant: 'error',
              ...snackbarBasicParams,
            });
          });
        }
      });
  }

  function saveHandler(
    updAction: MyCustomerUpdateAction,
    fieldName: keyof typeof user,
    value: string,
    successMsg?: SnackBarMsgs,
  ) {
    setUser({ ...user, [fieldName]: value });
    actionHandler(updAction, successMsg);
  }

  function addAddressHandler(value: BaseAddress, isDefault: boolean, useAsBoth: boolean, addressType: AddressTypes) {
    dispatch(userAddressUpdateThunk({ value, version: user.version, addressType, isDefault, useAsBoth }))
      .unwrap()
      .then(() => {
        enqueueSnackbar(SnackBarMsgs.ADDRESS_ADDED, {
          variant: 'success',
          ...snackbarBasicParams,
        });
      })
      .catch((e) => {
        const errors: ErrorObject[] = e.body.errors;
        if (errors) {
          errors.forEach((err) => {
            enqueueSnackbar(err.message, {
              variant: 'error',
              ...snackbarBasicParams,
            });
          });
        }
      });
  }

  function filterAddresses(addressIds: string[] = []) {
    const res: Address[] = [];
    addressIds.forEach((id) => {
      const address = user.addresses?.find((ad) => ad.id === id);
      if (address) {
        res.push(address);
      }
    });
    return res;
  }

  const shippingAddresses: Address[] = filterAddresses(user.shippingAddressIds);

  const billingAddresses: Address[] = filterAddresses(user.billingAddressIds);

  return (
    <Box
      sx={{
        width: {
          md: '75%',
          xs: '90%',
        },

        padding: 3,
        border: '2px solid',
        borderColor: 'divider',
        borderRadius: '7px',
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs orientation="horizontal" value={tabValue} onChange={handleTabChange} aria-label="tabs">
          <Tab label="Personal Info" {...a11yProps(0)} />
          <Tab label="Addresses" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <Box>
          <EditableInput
            name={FieldNames.EMAIL}
            initialValue={user?.email || ''}
            label={formFieldsConfig.email.profileLabel}
            schema={emailSchema}
            placeholder={formFieldsConfig.email.placeholder}
            onSave={(value) => {
              saveHandler(
                {
                  action: 'changeEmail',
                  email: value,
                },
                FieldNames.EMAIL,
                value,
                SnackBarMsgs.EMAIL_SUCCESS,
              );
            }}
          />
          <EditableInput
            name={FieldNames.FIRST_NAME}
            initialValue={user?.firstName || ''}
            label={formFieldsConfig.firstName.profileLabel}
            schema={firstNameSchema}
            placeholder={formFieldsConfig.firstName.placeholder}
            onSave={(value) => {
              saveHandler(
                {
                  action: 'setFirstName',
                  firstName: value,
                },
                FieldNames.FIRST_NAME,
                value,
                SnackBarMsgs.FIRST_NAME_SUCCESS,
              );
            }}
          />
          <EditableInput
            name={FieldNames.LAST_NAME}
            initialValue={user?.lastName || ''}
            label={formFieldsConfig.lastName.profileLabel}
            schema={lastNameSchema}
            placeholder={formFieldsConfig.lastName.placeholder}
            onSave={(value) => {
              saveHandler(
                {
                  action: 'setLastName',
                  lastName: value,
                },
                FieldNames.LAST_NAME,
                value,
                SnackBarMsgs.LAST_NAME_SUCCESS,
              );
            }}
          />
          <EditableDatePicker
            name={FieldNames.DATE_OF_BIRTH}
            initialValue={user?.dateOfBirth || ''}
            label={formFieldsConfig.dateOfBirth.profileLabel}
            schema={dateOfBirthSchema}
            onSave={(value) => {
              const dateValue = getFormattedDateValue(value);
              saveHandler(
                {
                  action: 'setDateOfBirth',
                  dateOfBirth: dateValue,
                },
                FieldNames.DATE_OF_BIRTH,
                dateValue,
                SnackBarMsgs.DOB_SUCCESS,
              );
            }}
          />
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Box sx={{ flexGrow: 1, display: 'flex', height: '100%' }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={addressTab}
            onChange={handleAddressTabChange}
            aria-label="addresses-tabs"
            sx={{ borderRight: 1, borderColor: 'divider', minWidth: '110px' }}
          >
            <Tab label="Shipping" {...a11yProps(0, 'vertical')} />
            <Tab label="Billing" {...a11yProps(1, 'vertical')} />
          </Tabs>
          <TabPanel value={addressTab} index={0} orientation="vertical">
            <AddressesList
              addresses={shippingAddresses}
              type={AddressTypes.SHIPPING}
              onSubmit={(address, isDefault, useAsBoth, addressAction, id) => {
                addressAction === AddressActions.CREATE
                  ? addAddressHandler(address, isDefault, useAsBoth, AddressTypes.SHIPPING)
                  : actionHandler(
                      { action: 'changeAddress', addressId: id, address: address },
                      SnackBarMsgs.ADDRESS_UPDATED,
                    );
              }}
              onDefaultClick={(id) => {
                actionHandler({ action: 'setDefaultShippingAddress', addressId: id }, SnackBarMsgs.SUCCESS);
              }}
              defaultId={user.defaultShippingAddressId}
              onRemoveClick={(address) => {
                if (!billingAddresses.some((addr) => addr.id === address.id)) {
                  actionHandler({ action: 'removeAddress', addressId: address.id }, SnackBarMsgs.ADDRESS_REMOVED);
                } else {
                  actionHandler(
                    { action: 'removeShippingAddressId', addressId: address.id },
                    SnackBarMsgs.SHIPPING_REMOVED,
                  );
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
                  : actionHandler(
                      { action: 'changeAddress', addressId: id, address: address },
                      SnackBarMsgs.ADDRESS_UPDATED,
                    );
              }}
              onDefaultClick={(id) => {
                actionHandler({ action: 'setDefaultBillingAddress', addressId: id }, SnackBarMsgs.SUCCESS);
              }}
              defaultId={user.defaultBillingAddressId}
              onRemoveClick={(address) => {
                if (!shippingAddresses.some((addr) => addr.id === address.id)) {
                  actionHandler({ action: 'removeAddress', addressId: address.id }, SnackBarMsgs.ADDRESS_REMOVED);
                } else {
                  actionHandler(
                    { action: 'removeBillingAddressId', addressId: address.id },
                    SnackBarMsgs.BILLING_REMOVED,
                  );
                }
              }}
            ></AddressesList>
          </TabPanel>
        </Box>
      </TabPanel>
    </Box>
  );
}

export default UserProfileForm;
