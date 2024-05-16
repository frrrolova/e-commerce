import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import SignupSchema from '@core/authValidation';
import { useAppDispatch, useAppSelector } from '@store/store';
import { TCountryCode, getCountryData } from 'countries-list';
import { LoadingButton } from '@mui/lab';
import FormTextInput from '../FormTextInput/FormTextInput';
import { FieldNames, RegistrationErrors, RegistrationResultMessages, RegistrationResults } from '@enums/auth-form.enum';
import { formFieldsConfig } from '@shared/auth-form.constants';
import { ErrorObject, MyCustomerDraft } from '@commercetools/platform-sdk';
import { userRegistrationThunk } from '@store/slices/user/thunks';
import { clearError } from '@/store/slices/user/userSlice';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Paths } from '@/routes/routeConstants';
import { useSnackbar } from 'notistack';
import { snackbarBasicParams } from './constants';

// TODO: autocomplete false
function RegistrationForm() {
  const dispatch = useAppDispatch();
  const isPending = useAppSelector((state) => state.user.isPending);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: {
      [FieldNames.EMAIL]: '',
      [FieldNames.PASSWORD]: '',
      [FieldNames.FIRST_NAME]: '',
      [FieldNames.LAST_NAME]: '',
      [FieldNames.DATE_OF_BIRTH]: '',
      [FieldNames.STREET]: '',
      [FieldNames.CITY]: '',
      [FieldNames.POSTAL_CODE]: '',
      [FieldNames.COUNTRY]: '',
    },
    validateOnMount: true,
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      const dateValue: string = new Date(values[FieldNames.DATE_OF_BIRTH]).toISOString().substring(0, 10);
      const newCustomerData: MyCustomerDraft = {
        email: values[FieldNames.EMAIL],
        password: values[FieldNames.PASSWORD],
        firstName: values[FieldNames.FIRST_NAME],
        lastName: values[FieldNames.LAST_NAME],
        dateOfBirth: dateValue,
        addresses: [
          {
            country: values[FieldNames.COUNTRY],
            city: values[FieldNames.CITY],
            streetName: values[FieldNames.STREET],
            postalCode: values[FieldNames.POSTAL_CODE],
          },
        ],
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
          console.log('OOPS! Registration failed:', e);
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

  const countryCodes: TCountryCode[] = useAppSelector((state) => (state.project?.countries as TCountryCode[]) || []);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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

      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <FormControl margin="dense" fullWidth>
            <InputLabel
              id={formFieldsConfig.country.labelId}
              error={formik.touched.country && Boolean(formik.errors.country)}
              size="small"
            >
              Country
            </InputLabel>
            <Select
              size="small"
              labelId={formFieldsConfig.country.labelId}
              id={formFieldsConfig.country.id}
              name={FieldNames.COUNTRY}
              value={formik.values.country}
              label={formFieldsConfig.country.label}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onClose={() => {
                formik.setFieldTouched(FieldNames.COUNTRY).then(() => {
                  formik.validateField(FieldNames.COUNTRY);
                });
              }}
              error={formik.touched.country && Boolean(formik.errors.country)}
            >
              {countryCodes.map((countryCode) => (
                <MenuItem value={countryCode} key={countryCode}>
                  {getCountryData(countryCode).name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error>{formik.touched.country && formik.errors.country}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormTextInput
            name={FieldNames.CITY}
            value={formik.values.city}
            label={formFieldsConfig.city.label}
            placeholder={formFieldsConfig.city.placeholder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.city) && Boolean(formik.errors.city)}
            errorMsg={formik.errors.city}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormTextInput
            name={FieldNames.STREET}
            value={formik.values.street}
            label={formFieldsConfig.street.label}
            placeholder={formFieldsConfig.street.placeholder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.street) && Boolean(formik.errors.street)}
            errorMsg={formik.errors.street}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormTextInput
            name={FieldNames.POSTAL_CODE}
            value={formik.values.postalCode}
            label={formFieldsConfig.postalCode.label}
            placeholder={formFieldsConfig.postalCode.placeholder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.postalCode) && Boolean(formik.errors.postalCode)}
            errorMsg={formik.errors.postalCode}
          />
        </Grid>
      </Grid>
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
      {/* <Button
        type="button"
        variant="contained"
        onClick={() => {
          dispatch(logout());
        }}
      >
        Logout
      </Button> */}
    </Box>
  );
}

export default RegistrationForm;
