import { Address, BaseAddress, Customer, ErrorObject, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { Box, Tab, Tabs, TabsOwnProps } from '@mui/material';
// import LabelBox from '../LabelBox/LabelBox';
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
// import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
// import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddressesList from '../AddressesList/AddressesList';

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

  function saveHandler(updAction: MyCustomerUpdateAction, fieldName: keyof typeof user, value: string | BaseAddress) {
    setUser({ ...user, [fieldName]: value });
    dispatch(
      userUpdateThunk({
        updAction,
        version: user.version,
      }),
    )
      .unwrap()
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

  function saveAddressHandler(
    // fieldName: keyof typeof user,
    value: BaseAddress,
    isDefault: boolean,
    useAsBoth: boolean,
    addressType: AddressTypes,
  ) {
    // setUser({ ...user, [fieldName]: value });
    dispatch(userAddressUpdateThunk({ value, version: user.version, addressType, isDefault, useAsBoth }))
      .unwrap()
      .catch((e) => {
        // setUser(userData);
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

  // function getAddressString(address: BaseAddress) {
  //   const { apartment, building, streetName, city, country, postalCode } = address;
  //   const addressStr = `${streetName} st., ${building}, apt. ${apartment}, ${city}, ${country}, ${postalCode}`;
  //   return addressStr;
  // }

  return (
    <Box
      sx={{
        width: {
          md: '70%',
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
        {/* <LabelBox label="Personal Info"> */}
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
              );
            }}
          />
        </Box>
        {/* </LabelBox> */}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Box sx={{ flexGrow: 1, display: 'flex', height: '100%' }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={addressTab}
            onChange={handleAddressTabChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider', minWidth: '110px' }}
          >
            <Tab label="Shipping" {...a11yProps(0, 'vertical')} />
            <Tab label="Billing" {...a11yProps(1, 'vertical')} />
          </Tabs>
          <TabPanel value={addressTab} index={0} orientation="vertical">
            <AddressesList
              addresses={shippingAddresses}
              type={AddressTypes.SHIPPING}
              title="New shipping address"
              onSubmit={(values, isDefault, useAsBoth) => {
                saveAddressHandler(values, isDefault, useAsBoth, AddressTypes.SHIPPING);
              }}
            ></AddressesList>
            {/* <Button
              variant="contained"
              size="small"
              sx={{
                alignSelf: 'center',
                // width: '100%',
              }}
              startIcon={<AddCircleOutlineOutlinedIcon />}
            >
              Add new address
            </Button>
            <List>
              {shippingAddresses.map((address, id) => (
                <ListItem key={`shipping-${id}`}>
                  <PlaceOutlinedIcon sx={{ mr: 1 }} />
                  {getAddressString(address)}
                </ListItem>
              ))}
            </List> */}
          </TabPanel>
          <TabPanel value={addressTab} index={1} orientation="vertical">
            <AddressesList
              addresses={billingAddresses}
              type={AddressTypes.BILLING}
              title="New billing address"
              onSubmit={(values, isDefault, useAsBoth) => {
                saveAddressHandler(values, isDefault, useAsBoth, AddressTypes.BILLING);
              }}
            ></AddressesList>
            {/* <Button>Add new address</Button>
            <List>
              {billingAddresses.map((address, id) => (
                <ListItem key={`billing-${id}`}>
                  <PlaceOutlinedIcon sx={{ mr: 1 }} />
                  {getAddressString(address)}
                </ListItem>
              ))}
            </List> */}
          </TabPanel>
        </Box>
        {/* <LabelBox label="Addresses">
          <div>aaaaa</div>
        </LabelBox> */}
      </TabPanel>
    </Box>
    // </Box>
  );
}

export default UserProfileForm;
