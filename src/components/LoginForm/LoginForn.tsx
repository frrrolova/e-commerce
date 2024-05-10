import { Box, Container, IconButton, InputAdornment, Paper, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { SignupLoginSchema } from '../../core/authValidation';
import { useState } from 'react';
import { FieldNames, loginInitialValues } from './constants';
import backPlantImg from '/images/registration/reg-back.png';
import cornerPlantImg from '/images/registration/corner-plant.png';
import FormTextInput from '../FormTextInput/FormTextInput';
import { formFieldsConfig } from '../../shared/auth-form.constants';

function LoginForm() {
  const formik = useFormik({
    initialValues: loginInitialValues,
    validateOnMount: true,
    validationSchema: SignupLoginSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
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
            width: 300,
            zIndex: -1,
            top: 70,
            left: 10,
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
              xs: '95%',
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
            Login
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
            <LoadingButton
              type="submit"
              variant="contained"
              disabled={!formik.isValid}
              sx={{
                marginTop: '8px',
              }}
            >
              Login
            </LoadingButton>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default LoginForm;
