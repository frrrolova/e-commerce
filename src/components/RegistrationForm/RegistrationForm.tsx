import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import {
  Box,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link,
  Switch,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import SignupSchema from '@/core/registrationValidation';
import { useAppDispatch, useAppSelector } from '@store/store';
import { TCountryCode } from 'countries-list';
import { LoadingButton } from '@mui/lab';
import FormTextInput from '@components/FormTextInput/FormTextInput';
import {
  AddressTypes,
  FieldNames,
  RegistrationErrors,
  RegistrationResultMessages,
  RegistrationResults,
} from '@enums/auth-form.enum';
import { formFieldsConfig } from '@shared/auth-form.constants';
import { CustomerDraft, ErrorObject } from '@commercetools/platform-sdk';
import { userRegistrationThunk } from '@store/slices/user/thunks';
import { clearError } from '@/store/slices/user/userSlice';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Paths } from '@/routes/routeConstants';
import { useSnackbar } from 'notistack';
import { countriesList, snackbarBasicParams } from './constants';
import AddressForm from '@components/AddressForm/AddressForm';

// TODO: autocomplete false
function RegistrationForm() {
  const dispatch = useAppDispatch();
  const isPending = useAppSelector((state) => state.user.isPending);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [isShippingDefault, setIsShippingDefault] = useState(true);
  const [isBillingDefault, setIsBillingDefault] = useState(true);
  const [billingAsShipping, setBillingAsShipping] = useState(true);

  const formik = useFormik({
    initialValues: {
      [FieldNames.EMAIL]: '',
      [FieldNames.PASSWORD]: '',
      [FieldNames.FIRST_NAME]: '',
      [FieldNames.LAST_NAME]: '',
      [FieldNames.DATE_OF_BIRTH]: '',
      [AddressTypes.SHIPPING]: {
        [FieldNames.COUNTRY]: '',
        [FieldNames.CITY]: '',
        [FieldNames.STREET]: '',
        [FieldNames.POSTAL_CODE]: '',
        [FieldNames.BUILDING]: '',
        [FieldNames.APARTMENT]: '',
      },
      [AddressTypes.BILLING]: {
        [FieldNames.COUNTRY]: '',
        [FieldNames.CITY]: '',
        [FieldNames.STREET]: '',
        [FieldNames.POSTAL_CODE]: '',
        [FieldNames.BUILDING]: '',
        [FieldNames.APARTMENT]: '',
      },
    },
    validateOnMount: true,
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      const dateValue: string = new Date(values[FieldNames.DATE_OF_BIRTH]).toISOString().substring(0, 10);
      const newCustomerData: CustomerDraft = {
        email: values[FieldNames.EMAIL],
        password: values[FieldNames.PASSWORD],
        firstName: values[FieldNames.FIRST_NAME],
        lastName: values[FieldNames.LAST_NAME],
        dateOfBirth: dateValue,
        addresses: [
          {
            country: values[AddressTypes.SHIPPING][FieldNames.COUNTRY],
            city: values[AddressTypes.SHIPPING][FieldNames.CITY],
            streetName: values[AddressTypes.SHIPPING][FieldNames.STREET],
            postalCode: values[AddressTypes.SHIPPING][FieldNames.POSTAL_CODE],
            building: values[AddressTypes.SHIPPING][FieldNames.BUILDING],
            apartment: values[AddressTypes.SHIPPING][FieldNames.APARTMENT],
          },
          {
            country: values[AddressTypes.BILLING][FieldNames.COUNTRY],
            city: values[AddressTypes.BILLING][FieldNames.CITY],
            streetName: values[AddressTypes.BILLING][FieldNames.STREET],
            postalCode: values[AddressTypes.BILLING][FieldNames.POSTAL_CODE],
            building: values[AddressTypes.BILLING][FieldNames.BUILDING],
            apartment: values[AddressTypes.BILLING][FieldNames.APARTMENT],
          },
        ],
        shippingAddresses: [0],
        billingAddresses: [1],
        defaultShippingAddress: isShippingDefault ? 0 : undefined,
        defaultBillingAddress: isBillingDefault ? 1 : undefined,
      };
      dispatch(userRegistrationThunk(newCustomerData))
        .unwrap()
        .then(() => {
          enqueueSnackbar(RegistrationResultMessages.SUCCESS, {
            variant: RegistrationResults.SUCCESS,
            ...snackbarBasicParams,
          });
        })
        .then(() => {
          navigate(Paths.HOME);
        })
        .catch((e) => {
          const errors: ErrorObject[] = e.errors;
          if (errors) {
            errors.forEach((error: ErrorObject) => {
              if (error.code === RegistrationErrors.ALREADY_EXIST) {
                const msg = `${error.message} ${RegistrationResultMessages.ERR_ALREADY_EXIST}`;
                formik.setFieldError(FieldNames.EMAIL, msg);
              }
              enqueueSnackbar(error.message, {
                variant: RegistrationResults.ERROR,
                ...snackbarBasicParams,
              });
            });
          }
        });
    },
  });

  useEffect(() => {
    dispatch(clearError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (billingAsShipping === true) {
      formik.setFieldValue(
        `${[AddressTypes.BILLING]}.${[FieldNames.COUNTRY]}`,
        formik.values[AddressTypes.SHIPPING][FieldNames.COUNTRY],
      );
      formik.setFieldValue(
        `${[AddressTypes.BILLING]}.${[FieldNames.CITY]}`,
        formik.values[AddressTypes.SHIPPING][FieldNames.CITY],
      );
      formik.setFieldValue(
        `${[AddressTypes.BILLING]}.${[FieldNames.STREET]}`,
        formik.values[AddressTypes.SHIPPING][FieldNames.STREET],
      );
      formik.setFieldValue(
        `${[AddressTypes.BILLING]}.${[FieldNames.POSTAL_CODE]}`,
        formik.values[AddressTypes.SHIPPING][FieldNames.POSTAL_CODE],
      );
      formik.setFieldValue(
        `${[AddressTypes.BILLING]}.${[FieldNames.BUILDING]}`,
        formik.values[AddressTypes.SHIPPING][FieldNames.BUILDING],
      );
      formik.setFieldValue(
        `${[AddressTypes.BILLING]}.${[FieldNames.APARTMENT]}`,
        formik.values[AddressTypes.SHIPPING][FieldNames.APARTMENT],
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billingAsShipping]);

  const countryCodes: TCountryCode[] = countriesList;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box
      component="form"
      sx={{
        zIndex: 5,
        marginTop: 3,
        width: {
          xs: '97%',
          sm: '80%',
        },
      }}
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit(e);
      }}
    >
      <Divider>Credentials</Divider>
      <FormTextInput
        name={FieldNames.EMAIL}
        value={formik.values.email}
        label={formFieldsConfig.email.label}
        placeholder={formFieldsConfig.email.placeholder}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(formik.touched.email) && Boolean(formik.errors.email)}
        errorMsg={formik.errors.email}
        sx={{
          position: 'relative',
          zIndex: 3,
        }}
      />
      <FormTextInput
        name={FieldNames.PASSWORD}
        value={formik.values.password}
        label={formFieldsConfig.password.label}
        placeholder={formFieldsConfig.password.placeholder}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(formik.touched.password) && Boolean(formik.errors.password)}
        errorMsg={formik.errors.password}
        sx={{
          position: 'relative',
          zIndex: 3,
        }}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Divider sx={{ marginTop: 1 }}>Personal data</Divider>
      <FormTextInput
        name={FieldNames.FIRST_NAME}
        value={formik.values.firstName}
        label={formFieldsConfig.firstName.label}
        placeholder={formFieldsConfig.firstName.placeholder}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(formik.touched.firstName) && Boolean(formik.errors.firstName)}
        errorMsg={formik.errors.firstName}
        sx={{
          position: 'relative',
          zIndex: 3,
        }}
      />

      <FormTextInput
        name={FieldNames.LAST_NAME}
        value={formik.values.lastName}
        label={formFieldsConfig.lastName.label}
        placeholder={formFieldsConfig.lastName.placeholder}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(formik.touched.lastName) && Boolean(formik.errors.lastName)}
        errorMsg={formik.errors.lastName}
      />

      <FormControl fullWidth margin="dense">
        <DatePicker
          disableFuture
          name={FieldNames.DATE_OF_BIRTH}
          format="DD.MM.YYYY"
          onChange={(val): void => {
            formik.setFieldValue(FieldNames.DATE_OF_BIRTH, val?.toDate());
          }}
          onClose={() => {
            formik.setFieldTouched(FieldNames.DATE_OF_BIRTH).then(() => {
              formik.validateField(FieldNames.DATE_OF_BIRTH);
            });
          }}
          slotProps={{
            textField: {
              size: 'small',
              error: Boolean(formik.touched.dateOfBirth) && Boolean(formik.errors.dateOfBirth),
              onBlur: formik.handleBlur,
            },
          }}
        ></DatePicker>
        <FormHelperText error>{formik.touched.dateOfBirth && formik.errors.dateOfBirth}</FormHelperText>
      </FormControl>
      <Divider sx={{ marginTop: 1 }}>Shipping Address</Divider>
      <AddressForm
        prefix={AddressTypes.SHIPPING}
        touched={formik.touched[AddressTypes.SHIPPING] || {}}
        setFieldTouched={formik.setFieldTouched}
        errors={formik.errors[AddressTypes.SHIPPING] || {}}
        handleBlur={formik.handleBlur}
        handleChange={formik.handleChange}
        validateField={formik.validateField}
        values={formik.values[AddressTypes.SHIPPING]}
        countryCodes={countryCodes}
        onFieldChange={(fieldName, fieldValue) => {
          if (billingAsShipping) {
            const targetFieldName = `${AddressTypes.BILLING}.${fieldName.split('.')[1]}`;
            formik.setFieldValue(targetFieldName, fieldValue);
          }
        }}
      />

      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: {
            xs: 'wrap',
            sm: 'nowrap',
          },
        }}
      >
        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={isShippingDefault}
              onChange={() => {
                setIsShippingDefault(!isShippingDefault);
              }}
            />
          }
          label="Set as default shipping address"
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              onChange={() => {
                setBillingAsShipping(!billingAsShipping);
              }}
            />
          }
          label="Also use as billing address"
        />
      </Container>

      <Divider sx={{ marginTop: 1 }}>Billing Address</Divider>
      <AddressForm
        prefix={AddressTypes.BILLING}
        touched={formik.touched[AddressTypes.BILLING] || {}}
        setFieldTouched={formik.setFieldTouched}
        errors={formik.errors[AddressTypes.BILLING] || {}}
        handleBlur={formik.handleBlur}
        handleChange={formik.handleChange}
        validateField={formik.validateField}
        values={formik.values[AddressTypes.BILLING]}
        countryCodes={countryCodes}
        disabled={billingAsShipping}
      />
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: {
            xs: 'wrap',
            sm: 'nowrap',
          },
        }}
      >
        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={isBillingDefault}
              onChange={() => {
                setIsBillingDefault(!isBillingDefault);
              }}
            />
          }
          label="Set as default billing address"
        />
      </Container>

      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <LoadingButton
          type="submit"
          variant="contained"
          disabled={!formik.isValid}
          loading={isPending}
          sx={{
            marginTop: '8px',
          }}
        >
          Register
        </LoadingButton>
        <Typography
          component="p"
          sx={{
            marginTop: 1.5,
          }}
        >
          Already have an account?{' '}
          <Link component={RouterLink} to={Paths.AUTH}>
            Log in
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}

export default RegistrationForm;
