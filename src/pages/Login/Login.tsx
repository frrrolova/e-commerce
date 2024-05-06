import { Alert, Container, FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import styles from './Login.module.scss';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';

type LoginFormData = { email: string; password: string };

function Login() {
  const isLogoning = false;
  const [error, setError] = useState('');

  const validateForm = (values: LoginFormData): Partial<LoginFormData> => {
    const errors: Partial<LoginFormData> = {};
    const regEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}/;

    if (!values.email) {
      errors.email = 'Username is required';
      setError(errors.email);
    } else if (values.email.includes(' ')) {
      errors.email = 'Email address must not contain leading or trailing whitespace';
    } else if (!regEmail.test(values.email)) {
      errors.email = 'Email address must contain an "@" symbol separating local part and domain name.';
      setError(errors.email);
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password is too short';
    } else if (!/[A-Z]/.test(values.password)) {
      errors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(values.password)) {
      errors.password = 'Password must contain at least one lowercase letter';
    } else if (!/[0-9]/.test(values.password)) {
      errors.password = 'Password must contain at least one digit';
    } else if (values.password.includes(' ')) {
      errors.password = 'Password must not contain leading or trailing whitespace';
    }
    console.log(errors);
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnMount: true,
    validate: validateForm,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
      <Container>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <FormControl className={styles.control}>
            <InputLabel htmlFor="email-input">Email</InputLabel>
            <Input
              name="email"
              value={formik.values.email}
              id="email-input"
              aria-describedby="my-helper-text"
              onChange={formik.handleChange}
            />
            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
          </FormControl>

          <FormControl className={styles.control}>
            <InputLabel htmlFor="password-input">Password</InputLabel>
            <Input
              name="password"
              value={formik.values.password}
              id="password-input"
              aria-describedby="my-helper-text"
              onChange={formik.handleChange}
            />
            <FormHelperText id="my-helper-text">8 characters long</FormHelperText>
          </FormControl>

          <LoadingButton
            type="submit"
            disabled={!formik.isValid}
            loading={isLogoning}
            sx={{ width: '100%' }}
            variant="contained"
          >
            Submit
          </LoadingButton>
        </form>
        <div>{error}</div>

        {isLogoning && <Alert severity="error">{isLogoning}</Alert>}
      </Container>
    </>
  );
}

export default Login;
