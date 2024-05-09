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
  TextField,
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
import { FieldNames, regInitialValues } from './constants';

// TODO: autocomplete false
function RegistrationForm() {
  const formik = useFormik({
    initialValues: regInitialValues,
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
          <FormControl fullWidth margin="dense">
            <TextField
              size="small"
              sx={{
                position: 'relative',
                zIndex: 3,
              }}
              label="Email"
              name={FieldNames.EMAIL}
              value={formik.values.email}
              id="email-input"
              placeholder="Email"
              aria-describedby="my-helper-text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
            <FormHelperText error>{formik.touched.email && formik.errors.email}</FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <TextField
              size="small"
              sx={{
                position: 'relative',
                zIndex: 3,
              }}
              name={FieldNames.PASSWORD}
              label="Password"
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
              value={formik.values.password}
              id="password-input"
              placeholder="Password"
              aria-describedby="my-helper-text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
            />
            <FormHelperText error>{formik.touched.password && formik.errors.password}</FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <TextField
              size="small"
              label="First name"
              name={FieldNames.FIRST_NAME}
              value={formik.values.firstName}
              id="firstName-input"
              placeholder="First name"
              aria-describedby="my-helper-text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            />
            <FormHelperText error>{formik.touched.firstName && formik.errors.firstName}</FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <TextField
              size="small"
              label="Last Name"
              name={FieldNames.LAST_NAME}
              value={formik.values.lastName}
              id="lastName-input"
              placeholder="Last name"
              aria-describedby="my-helper-text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            />
            <FormHelperText error>{formik.touched.lastName && formik.errors.lastName}</FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <DatePicker
              disableFuture
              name={FieldNames.DATE_OF_BIRTH}
              format="DD.MM.YYYY"
              onChange={(val): void => {
                formik.setFieldValue('dateOfBirth', val?.toDate());
              }}
              onClose={() => {
                formik.setFieldTouched('dateOfBirth').then(() => {
                  formik.validateField('dateOfBirth');
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
                  id="country-label-id"
                  error={formik.touched.country && Boolean(formik.errors.country)}
                  size="small"
                >
                  Country
                </InputLabel>
                <Select
                  size="small"
                  labelId="country-label-id"
                  id="country-input"
                  name={FieldNames.COUNTRY}
                  value={formik.values.country}
                  label="Country"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  onClose={() => {
                    formik.setFieldTouched('country').then(() => {
                      formik.validateField('country');
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
              <FormControl fullWidth margin="dense">
                <TextField
                  size="small"
                  label="City"
                  name={FieldNames.CITY}
                  value={formik.values.city}
                  id="city-input"
                  placeholder="City"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                />
                <FormHelperText error>{formik.touched.city && formik.errors.city}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="dense">
                <TextField
                  size="small"
                  label="Street"
                  name={FieldNames.STREET}
                  value={formik.values.street}
                  id="street-input"
                  placeholder="Street"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.street && Boolean(formik.errors.street)}
                />
                <FormHelperText error>{formik.touched.street && formik.errors.street}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="dense">
                <TextField
                  size="small"
                  label="Postal code"
                  name={FieldNames.POSTAL_CODE}
                  value={formik.values.postalCode}
                  id="postal-code-input"
                  placeholder="Postal code"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
                />
                <FormHelperText error>{formik.touched.postalCode && formik.errors.postalCode}</FormHelperText>
              </FormControl>
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
