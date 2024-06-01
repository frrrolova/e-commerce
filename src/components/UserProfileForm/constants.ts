import { SxProps } from '@mui/material';

export enum SnackBarMsgs {
  SUCCESS = 'Updated successfully',
  ADDRESS_ADDED = 'Address added successfully',
  ADDRESS_UPDATED = 'Address updated successfully',
  ADDRESS_REMOVED = 'Address removed successfully',
  BILLING_REMOVED = 'Billing address removed successfully',
  SHIPPING_REMOVED = 'Shipping address removed successfully',
  EMAIL_SUCCESS = 'Email updated successfully',
  FIRST_NAME_SUCCESS = 'First name updated successfully',
  LAST_NAME_SUCCESS = 'Last name updated successfully',
  DOB_SUCCESS = 'Date of birth updated successfully',
  PASSWORD_CHANGED = 'Password changed successfully',
}

export const addressesTabsStyles: SxProps = {
  paddingX: {
    xs: 1,
    md: 2,
  },
  fontSize: {
    xs: '0.8rem',
    sm: '0.9rem',
  },
};
