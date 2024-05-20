import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import FormTextInput from '@components/FormTextInput/FormTextInput';
import { FormikValues, useFormik } from 'formik';
import { AddressTypes, FieldNames } from '@/enums/auth-form.enum';
import { formFieldsConfig } from '@/shared/auth-form.constants';
import { TCountryCode, getCountryData } from 'countries-list';

type AddressFormFormik = ReturnType<typeof useFormik<FormikValues>>;

const AddressForm = ({
  prefix,
  touched,
  errors,
  values,
  handleChange,
  handleBlur,
  setFieldTouched,
  validateField,
  countryCodes,
  disabled,
  onFieldChange,
}: {
  prefix: AddressTypes;
  touched: AddressFormFormik['touched'];
  errors: AddressFormFormik['errors'];
  values: AddressFormFormik['values'];
  handleChange: AddressFormFormik['handleChange'];
  handleBlur: AddressFormFormik['handleBlur'];
  setFieldTouched: AddressFormFormik['setFieldTouched'];
  validateField: AddressFormFormik['validateField'];
  countryCodes: TCountryCode[];
  disabled?: boolean;
  onFieldChange?: (fieldName: string, value: string) => void;
}) => {
  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12} md={6}>
        <FormControl margin="dense" fullWidth disabled={disabled}>
          <InputLabel
            id={formFieldsConfig.country.labelId}
            error={!disabled && touched.country && Boolean(errors.country)}
            size="small"
          >
            {formFieldsConfig.country.label}
          </InputLabel>
          <Select
            size="small"
            labelId={formFieldsConfig.country.labelId}
            id={formFieldsConfig.country.id}
            name={`${prefix}.${FieldNames.COUNTRY}`}
            value={values.country}
            label={formFieldsConfig.country.label}
            onChange={(e: SelectChangeEvent) => {
              handleChange(e);
              onFieldChange?.(e.target.name, e.target.value);
            }}
            onBlur={handleBlur}
            onClose={() => {
              setFieldTouched(`${prefix}.${FieldNames.COUNTRY}`).then(() => {
                validateField(`${prefix}.${FieldNames.COUNTRY}`);
              });
            }}
            error={!disabled && touched.country && Boolean(errors.country)}
          >
            {countryCodes.map((countryCode) => (
              <MenuItem value={countryCode} key={countryCode}>
                {getCountryData(countryCode).name}
              </MenuItem>
            ))}
          </Select>
          {!disabled && touched.country && errors.country && (
            <FormHelperText error>{errors.country as string}</FormHelperText>
          )}
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormTextInput
          disabled={disabled}
          name={`${prefix}.${FieldNames.CITY}`}
          value={values.city}
          label={formFieldsConfig.city.label}
          placeholder={formFieldsConfig.city.placeholder}
          onChange={(e: SelectChangeEvent) => {
            handleChange(e);
            onFieldChange?.(e.target.name, e.target.value);
            setFieldTouched(`${prefix}.${FieldNames.CITY}`).then(() => {
              validateField(`${prefix}.${FieldNames.CITY}`);
            });
          }}
          onBlur={handleBlur}
          error={!disabled && Boolean(touched.city) && Boolean(errors.city)}
          errorMsg={!disabled ? (errors.city as string) : ''}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormTextInput
          disabled={disabled}
          name={`${prefix}.${FieldNames.STREET}`}
          value={values.street}
          label={formFieldsConfig.street.label}
          placeholder={formFieldsConfig.street.placeholder}
          onChange={(e: SelectChangeEvent) => {
            handleChange(e);
            onFieldChange?.(e.target.name, e.target.value);
            setFieldTouched(`${prefix}.${FieldNames.STREET}`).then(() => {
              validateField(`${prefix}.${FieldNames.STREET}`);
            });
          }}
          onBlur={handleBlur}
          error={!disabled && Boolean(touched.street) && Boolean(errors.street)}
          errorMsg={!disabled ? (errors.street as string) : ''}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormTextInput
          disabled={disabled}
          name={`${prefix}.${FieldNames.POSTAL_CODE}`}
          value={values.postalCode}
          label={formFieldsConfig.postalCode.label}
          placeholder={formFieldsConfig.postalCode.placeholder}
          onChange={(e: SelectChangeEvent) => {
            handleChange(e);
            onFieldChange?.(e.target.name, e.target.value);
            setFieldTouched(`${prefix}.${FieldNames.POSTAL_CODE}`).then(() => {
              validateField(`${prefix}.${FieldNames.POSTAL_CODE}`);
            });
          }}
          onBlur={handleBlur}
          error={!disabled && Boolean(touched.postalCode) && Boolean(errors.postalCode)}
          errorMsg={!disabled ? (errors.postalCode as string) : ''}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormTextInput
          disabled={disabled}
          name={`${prefix}.${FieldNames.BUILDING}`}
          value={values.building}
          label={formFieldsConfig.building.label}
          placeholder={formFieldsConfig.building.placeholder}
          onChange={(e: SelectChangeEvent) => {
            handleChange(e);
            onFieldChange?.(e.target.name, e.target.value);
            setFieldTouched(`${prefix}.${FieldNames.BUILDING}`).then(() => {
              validateField(`${prefix}.${FieldNames.BUILDING}`);
            });
          }}
          onBlur={handleBlur}
          error={!disabled && Boolean(touched.building) && Boolean(errors.building)}
          errorMsg={!disabled ? (errors.building as string) : ''}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormTextInput
          disabled={disabled}
          name={`${prefix}.${FieldNames.APARTMENT}`}
          value={values.apartment}
          label={formFieldsConfig.apartment.label}
          placeholder={formFieldsConfig.apartment.placeholder}
          onChange={(e: SelectChangeEvent) => {
            handleChange(e);
            onFieldChange?.(e.target.name, e.target.value);
            setFieldTouched(`${prefix}.${FieldNames.APARTMENT}`).then(() => {
              validateField(`${prefix}.${FieldNames.APARTMENT}`);
            });
          }}
          onBlur={handleBlur}
          error={!disabled && Boolean(touched.apartment) && Boolean(errors.apartment)}
          errorMsg={!disabled ? (errors.apartment as string) : ''}
        />
      </Grid>
    </Grid>
  );
};

export default AddressForm;
