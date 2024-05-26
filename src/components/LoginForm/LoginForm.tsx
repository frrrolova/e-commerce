import { Box, IconButton, InputAdornment, Link, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import SignupLoginSchema from '../../core/loginValidation';
import { useState, useEffect } from 'react';
import FormTextInput from '../FormTextInput/FormTextInput';
import { formFieldsConfig } from '../../shared/auth-form.constants';
import { FieldNames, LoginErrors, LoginResultMessages, LoginResults } from '@enums/auth-form.enum';
import { MyCustomerDraft, ErrorObject } from '@commercetools/platform-sdk';
import { userLoginThunk } from '@/store/slices/user/thunks';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { clearError } from '@/store/slices/user/userSlice';
import { useSnackbar } from 'notistack';
import { Link as RouterLink } from 'react-router-dom';
import { Paths } from '@/routes/routeConstants';
import { useNavigate } from 'react-router-dom';

const snackbarBasicParams = {
  style: { width: '300px' },
  anchorOrigin: { vertical: 'top' as const, horizontal: 'center' as const },
};

function LoginForm() {
  const dispatch = useAppDispatch();
  const isPending = useAppSelector((state) => state.user.isAuthPending);
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
          enqueueSnackbar(LoginResultMessages.SUCCESS, {
            variant: LoginResults.SUCCESS,
            ...snackbarBasicParams,
          });
        })
        .then(() => {
          navigate(Paths.HOME);
        })
        .catch((e) => {
          const errors: ErrorObject[] = e.body?.errors;
          if (errors) {
            errors.forEach((error: ErrorObject) => {
              console.log(error.code);
              if (error.code === LoginErrors.NOT_FOUND) {
                const msg = `${error.message} ${LoginResultMessages.NOT_FOUND}`;
                formik.setFieldError(FieldNames.EMAIL, msg);
              }
              enqueueSnackbar(error.message, {
                variant: LoginResults.ERROR,
                ...snackbarBasicParams,
              });
            });
          }
        });
    },
  });

  const handleChange = (e: React.ChangeEvent, fieldName: string) => {
    formik.handleChange(e);
    formik.setFieldTouched(fieldName).then(() => {
      formik.validateField(fieldName);
    });
  };

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
          width: {
            xs: '95%',
            sm: '80%',
          },
        }}
      >
        <FormTextInput
          name={FieldNames.EMAIL}
          value={formik.values.email}
          label={formFieldsConfig.email.label}
          placeholder={formFieldsConfig.email.placeholder}
          onChange={(e) => handleChange(e, FieldNames.EMAIL)}
          onBlur={formik.handleBlur}
          error={formik.touched[FieldNames.EMAIL] && Boolean(formik.errors.email)}
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
          onChange={(e) => handleChange(e, FieldNames.PASSWORD)}
          onBlur={formik.handleBlur}
          error={formik.touched[FieldNames.PASSWORD] && Boolean(formik.errors.password)}
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
          loading={isPending}
          sx={{
            marginTop: '8px',
          }}
        >
          Login
        </LoadingButton>
        <Typography
          component="p"
          sx={{
            marginTop: 1.5,
          }}
        >
          Don't have an account?{' '}
          <Link component={RouterLink} to={Paths.REGISTER}>
            Register
          </Link>
        </Typography>
      </Box>
    </>
  );
}

export default LoginForm;
