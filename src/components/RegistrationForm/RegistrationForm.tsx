import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import SignupSchema from '../../core/authValidation';
import { useAppSelector } from '../../store/store';
import { TCountryCode, getCountryData } from 'countries-list';
import { LoadingButton } from '@mui/lab';
import backPlantImg from '/images/registration/reg-back.png';
import cornerPlantImg from '/images/registration/corner-plant.png';
import FormTextInput from '../FormTextInput/FormTextInput';
import { FieldNames } from '../../enums/auth-form.enum';
import { formFieldsConfig } from '../../shared/auth-form.constants';

// TODO: autocomplete false
function RegistrationForm() {
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
      console.log(values);
    },
  });

  const countryCodes: TCountryCode[] = useAppSelector((state) => (state.project?.countries as TCountryCode[]) || []);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        component="img"
        sx={{
          position: 'absolute',
          width: 360,
          zIndex: -1,
          top: 60,
          left: 0,
        }}
        alt="Ficus"
        src={backPlantImg}
      />
      <Paper
        elevation={2}
        sx={{
          position: 'relative',
          zIndex: 1,
          marginTop: 5,
          paddingY: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: 0.9,
          width: {
            xs: '90%',
            md: '70%',
          },
        }}
      >
        <Box
          component="img"
          sx={{
            position: 'absolute',
            width: 170,
            zIndex: 2,
            top: -35,
            right: -42,
          }}
          alt="Plant"
          src={cornerPlantImg}
        />
        <Typography component="h1" variant="h5">
          Registration
        </Typography>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 3,
            width: '80%',
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
            sx={{
              marginTop: '8px',
            }}
          >
            Register
          </LoadingButton>
        </Box>
      </Paper>
    </Container>
  );
}

export default RegistrationForm;
