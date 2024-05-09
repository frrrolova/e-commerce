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
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { SignupLoginSchema } from '../../core/authValidation';
import { useState } from 'react';
import { FieldNames, loginInitialValues } from './constants';
import backPlantImg from '/images/registration/reg-back.png';
import cornerPlantImg from '/images/registration/corner-plant.png';

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
