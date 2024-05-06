import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { Box, FormControl, FormHelperText, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Should contain minimum 8 characters')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])$/, {
      message: 'Should contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
      excludeEmptyString: true,
    }),
  firstName: Yup.string()
    .required('First name is equired')
    .matches(/^[a-zA-Z-+]+$/, {
      message: 'Should contain only English letters and the "-" symbol',
      excludeEmptyString: true,
    }),
  lastName: Yup.string()
    .required('Required')
    .matches(/^[a-zA-Z-+]+$/, {
      message: 'Should contain only English letters and the "-" symbol',
      excludeEmptyString: true,
    }),
  dateOfBirth: Yup.date()
    .typeError('Invalid date')
    .required('Required')
    .max(new Date())
    .test('dateOfBirth', 'You must be 13 or older', function (birthdate?: Date) {
      if (birthdate) {
        const cutoff = new Date();
        cutoff.setFullYear(cutoff.getFullYear() - 13);
        return birthdate <= cutoff;
      }
      return true;
    }),

  // street: Yup.string().email('Invalid email').required('Required'),
  // city: Yup.string().email('Invalid email').required('Required'),
  // postalCode: Yup.string().email('Invalid email').required('Required'),
  // country: Yup.string().email('Invalid email').required('Required'),
});

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
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
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
          maxWidth: 500,
          width: 500,
        }}
      >
        <FormControl fullWidth margin="dense">
          <TextField
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
    </Box>
  );
}

export default RegistrationForm;
