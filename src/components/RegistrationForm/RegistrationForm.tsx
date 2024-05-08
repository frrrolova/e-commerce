import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import SignupSchema from '../../core/authValidation';

function RegistrationForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      street: '',
      city: '',
      postalCode: '',
      country: '',
    },
    validateOnMount: true,
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      console.log(values);
      // dispatch(userLoginThunk(values))
      //   .unwrap()
      //   .then(() => {
      //     navigate('/home');
      //   })
      //   .catch(() => {
      //     console.log('BBBBBBBB fail');
      //   });
    },
  });

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
        src="assets/reg-back.png"
      />
      <Paper
        elevation={2}
        sx={{
          position: 'relative',
          zIndex: 1,
          marginTop: 8,
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
            // maxHeight: { xs: 233, md: 167 },
            // maxWidth: { xs: 350, md: 250 },
          }}
          alt="Plant"
          src="assets/plant.png"
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
              sx={{
                position: 'relative',
                zIndex: 3,
              }}
              label="Email"
              name="email"
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
              sx={{
                position: 'relative',
                zIndex: 3,
              }}
              name="password"
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
              label="First name"
              name="firstName"
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
              label="Last Name"
              name="lastName"
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
              name="dateOfBirth"
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
                  // name: 'dateOfBirth',
                  error: Boolean(formik.touched.dateOfBirth) && Boolean(formik.errors.dateOfBirth),
                  onBlur: formik.handleBlur,
                },
              }}

              // error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
            ></DatePicker>
            <FormHelperText error>{formik.touched.dateOfBirth && formik.errors.dateOfBirth}</FormHelperText>
          </FormControl>
        </Box>
      </Paper>
    </Container>
  );
}

export default RegistrationForm;
