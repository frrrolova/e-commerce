import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import FormTextInput from '@components/FormTextInput/FormTextInput';
import { FormikValues, useFormik } from 'formik';
import { AddressTypes, FieldNames } from '@/enums/auth-form.enum';
import { formFieldsConfig } from '@/shared/auth-form.constants';
import { TCountryCode, getCountryData } from 'countries-list';

type AddressFormFormik = ReturnType<typeof useFormik<FormikValues>>;

function getFieldName(name: FieldNames, prefix?: string): string {
  const nameArr: string[] = [name];
  if (prefix) {
    nameArr.unshift(prefix);
  }

  return nameArr.join('.');
}

export interface AddressGroupProps {
  prefix?: AddressTypes;
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
}

const AddressGroup = ({
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
}: AddressGroupProps) => {
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
            name={getFieldName(FieldNames.COUNTRY, prefix)}
            data-testid={getFieldName(FieldNames.COUNTRY, prefix)}
            value={values.country}
            label={formFieldsConfig.country.label}
            onChange={(e: SelectChangeEvent) => {
              handleChange(e);
              onFieldChange?.(e.target.name, e.target.value);
            }}
            onBlur={handleBlur}
            onClose={() => {
              setFieldTouched(getFieldName(FieldNames.COUNTRY, prefix)).then(() => {
                validateField(getFieldName(FieldNames.COUNTRY, prefix));
              });
            }}
            error={!disabled && touched.country && Boolean(errors.country)}
          >
            {countryCodes.map((countryCode) => (
              <MenuItem value={countryCode} key={countryCode} data-testid={`menuItem.${countryCode}`}>
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
          name={getFieldName(FieldNames.CITY, prefix)}
          data-testid={getFieldName(FieldNames.CITY, prefix)}
          value={values.city}
          label={formFieldsConfig.city.label}
          placeholder={formFieldsConfig.city.placeholder}
          onChange={(e: SelectChangeEvent) => {
            handleChange(e);
            onFieldChange?.(e.target.name, e.target.value);
            setFieldTouched(getFieldName(FieldNames.CITY, prefix)).then(() => {
              validateField(getFieldName(FieldNames.CITY, prefix));
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
          name={getFieldName(FieldNames.STREET, prefix)}
          data-testid={getFieldName(FieldNames.STREET, prefix)}
          value={values.street}
          label={formFieldsConfig.streetName.label}
          placeholder={formFieldsConfig.streetName.placeholder}
          onChange={(e: SelectChangeEvent) => {
            handleChange(e);
            onFieldChange?.(e.target.name, e.target.value);
            setFieldTouched(getFieldName(FieldNames.STREET, prefix)).then(() => {
              validateField(getFieldName(FieldNames.STREET, prefix));
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
          name={getFieldName(FieldNames.POSTAL_CODE, prefix)}
          data-testid={getFieldName(FieldNames.POSTAL_CODE, prefix)}
          value={values.postalCode}
          label={formFieldsConfig.postalCode.label}
          placeholder={formFieldsConfig.postalCode.placeholder}
          onChange={(e: SelectChangeEvent) => {
            handleChange(e);
            onFieldChange?.(e.target.name, e.target.value);
            setFieldTouched(getFieldName(FieldNames.POSTAL_CODE, prefix)).then(() => {
              validateField(getFieldName(FieldNames.POSTAL_CODE, prefix));
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
          name={getFieldName(FieldNames.BUILDING, prefix)}
          data-testid={getFieldName(FieldNames.BUILDING, prefix)}
          value={values.building}
          label={formFieldsConfig.building.label}
          placeholder={formFieldsConfig.building.placeholder}
          onChange={(e: SelectChangeEvent) => {
            handleChange(e);
            onFieldChange?.(e.target.name, e.target.value);
            setFieldTouched(getFieldName(FieldNames.BUILDING, prefix)).then(() => {
              validateField(getFieldName(FieldNames.BUILDING, prefix));
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
          name={getFieldName(FieldNames.APARTMENT, prefix)}
          data-testid={getFieldName(FieldNames.APARTMENT, prefix)}
          value={values.apartment}
          label={formFieldsConfig.apartment.label}
          placeholder={formFieldsConfig.apartment.placeholder}
          onChange={(e: SelectChangeEvent) => {
            handleChange(e);
            onFieldChange?.(e.target.name, e.target.value);
            setFieldTouched(getFieldName(FieldNames.APARTMENT, prefix)).then(() => {
              validateField(getFieldName(FieldNames.APARTMENT, prefix));
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

export default AddressGroup;
