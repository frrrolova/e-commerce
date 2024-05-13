import { Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import SignupLoginSchema from '../../core/loginValidation';
import { useState } from 'react';
import FormTextInput from '../FormTextInput/FormTextInput';
import { formFieldsConfig } from '../../shared/auth-form.constants';
import { FieldNames } from '../../enums/auth-form.enum';
import CircularProgress from '@mui/material/CircularProgress';
import { MyCustomerDraft } from '@commercetools/platform-sdk';
import { userLoginThunk } from '@/store/slices/user/thunk';
import { useAppSelector, useAppDispatch } from '@/store/store';

function LoginForm() {
  const dispatch = useAppDispatch();
  const isPending = useAppSelector((state) => state.user.isPending);

  const formik = useFormik({
    initialValues: {
      [FieldNames.EMAIL]: '',
      [FieldNames.PASSWORD]: '',
    },
    validateOnMount: true,
    validationSchema: SignupLoginSchema,
    onSubmit: (values) => {
      const newCustomerData: MyCustomerDraft = {
        email: values[FieldNames.EMAIL],
        password: values[FieldNames.PASSWORD],
      };
      dispatch(userLoginThunk(newCustomerData))
        .unwrap()
        .then(() => {
          console.log(localStorage.getItem('CREDENTIALS'));
        })
        .catch((e) => {
          console.log(e.message);
        });
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Box
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
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
      {isPending && (
        <CircularProgress
          size={96}
          sx={{
            position: 'absolute',
            top: '40%',
            left: '50%',
          }}
        />
      )}
    </>
  );
}

export default LoginForm;
