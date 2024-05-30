import { Box, Button, Checkbox, Dialog, FormControlLabel, Switch, Typography } from '@mui/material';
import AddressGroup from '../AddressGroup/AddressGroup';
import { LoadingButton } from '@mui/lab';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { AddressTypes, FieldNames } from '@/enums/auth-form.enum';
import { useFormik } from 'formik';
import { addressSchema } from '@/core/commonValidation';
import { useState } from 'react';
import { countriesList } from '../RegistrationForm/constants';
import { TCountryCode } from 'countries-list';
import { Address, BaseAddress } from '@commercetools/platform-sdk';
import { AddressActions } from '@/enums/addressActions.enum';
import { ControlLabels, FormTitles } from './constants';

interface AddressFormProps {
  open: boolean;
  address: Address | null;
  type: AddressTypes;
  onSubmit: (
    values: BaseAddress,
    isDefault: boolean,
    useAsBoth: boolean,
    addressAction: AddressActions,
    id?: string,
  ) => void;
  onClose: () => void;
}

function AddressModalForm({ open, type, address, onSubmit, onClose }: AddressFormProps) {
  function getTitle() {
    if (!address) {
      return type === AddressTypes.SHIPPING ? FormTitles.SHIPPING : FormTitles.BILLING;
    }
    return FormTitles.NEW;
  }

  const formik = useFormik({
    initialValues: {
      [FieldNames.COUNTRY]: address?.country || '',
      [FieldNames.CITY]: address?.city || '',
      [FieldNames.STREET]: address?.streetName || '',
      [FieldNames.POSTAL_CODE]: address?.postalCode || '',
      [FieldNames.BUILDING]: address?.building || '',
      [FieldNames.APARTMENT]: address?.apartment || '',
    },
    enableReinitialize: true,
    validationSchema: addressSchema,
    onSubmit: (values) => {
      onClose();
      const action = address ? AddressActions.UPDATE : AddressActions.CREATE;
      onSubmit(values, isDefault, useAsBoth, action, address?.id);
    },
  });

  const [isDefault, setIsDefault] = useState(false);
  const [useAsBoth, setUseAsBoth] = useState(false);

  const countryCodes: TCountryCode[] = countriesList;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        component={'form'}
        sx={{ padding: 2 }}
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <Typography component={'h2'} fontSize={'1.3em'} mb={1}>
          {getTitle()}
        </Typography>
        <AddressGroup
          touched={formik.touched || {}}
          setFieldTouched={formik.setFieldTouched}
          errors={formik.errors || {}}
          handleBlur={formik.handleBlur}
          handleChange={formik.handleChange}
          validateField={formik.validateField}
          values={formik.values}
          countryCodes={countryCodes}
        />
        {!address && (
          <Box paddingX={1}>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={isDefault}
                  onChange={() => {
                    setIsDefault(!isDefault);
                  }}
                />
              }
              label={ControlLabels.SET_DEFAULT}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(_, checked) => {
                    setUseAsBoth(checked);
                  }}
                />
              }
              label={type === AddressTypes.SHIPPING ? ControlLabels.ALSO_BILLING : ControlLabels.ALSO_BILLING}
            />
          </Box>
        )}
        <Box display={'flex'} gap={1} mt={1}>
          <LoadingButton
            type="submit"
            variant="contained"
            size="small"
            disabled={!formik.isValid}
            startIcon={<SaveOutlinedIcon />}
          >
            Save
          </LoadingButton>
          <Button variant="contained" size="small" onClick={onClose} startIcon={<CloseIcon />}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

export default AddressModalForm;
