import { Box, Button, Checkbox, FormControlLabel, Switch, Typography } from '@mui/material';
import AddressGroup from '../AddressGroup/AddressGroup';
import { LoadingButton } from '@mui/lab';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { AddressTypes, FieldNames } from '@/enums/auth-form.enum';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addressSchema } from '@/core/commonValidation';
import { useState } from 'react';
import { countriesList } from '../RegistrationForm/constants';
import { TCountryCode } from 'countries-list';
import { Address, BaseAddress } from '@commercetools/platform-sdk';

interface AddressFormProps {
  address?: Address;
  type: AddressTypes;
  title: string;
  onSubmit: (values: BaseAddress, isDefault: boolean, useAsBoth: boolean) => void;
  onClose: () => void;
}

function AddressForm({ type, title, address, onSubmit, onClose }: AddressFormProps) {
  const formik = useFormik({
    initialValues: {
      [type]: {
        [FieldNames.COUNTRY]: address?.country || '',
        [FieldNames.CITY]: address?.city || '',
        [FieldNames.STREET]: address?.streetName || '',
        [FieldNames.POSTAL_CODE]: address?.postalCode || '',
        [FieldNames.BUILDING]: address?.building || '',
        [FieldNames.APARTMENT]: address?.apartment || '',
      },
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      [type]: addressSchema,
    }),
    onSubmit: (values) => {
      onSubmit(values[type], isDefault, useAsBoth);
      console.log(values);
    },
  });

  const [isDefault, setIsDefault] = useState(false);
  const [useAsBoth, setUseAsBoth] = useState(false);

  const countryCodes: TCountryCode[] = countriesList;

  return (
    <Box
      component={'form'}
      sx={{ padding: 2 }}
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit(e);
      }}
    >
      <Typography component={'h2'} fontSize={'1.3em'}>
        {title}
      </Typography>
      <AddressGroup
        prefix={type}
        touched={formik.touched[type] || {}}
        setFieldTouched={formik.setFieldTouched}
        errors={formik.errors[type] || {}}
        handleBlur={formik.handleBlur}
        handleChange={formik.handleChange}
        validateField={formik.validateField}
        values={formik.values[type]}
        countryCodes={countryCodes}
      />
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
          label="Set as default address"
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={(_, checked) => {
                setUseAsBoth(checked);
              }}
            />
          }
          label={`Also use as ${type === AddressTypes.SHIPPING ? 'billing' : 'shipping'} address`}
        />
      </Box>
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
  );
}

export default AddressForm;
