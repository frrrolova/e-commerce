import * as Yup from 'yup';
import { ValidationErrors } from '../enums/auth-form.enum';
import { emailRegexp, passwordRegexp } from './commonValidation';

const validationConstants = {
  passwordMinLength: 8,
};

const SignupLoginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegexp, {
      message: ValidationErrors.EMAIL_INVALID,
      excludeEmptyString: true,
    })
    .required(ValidationErrors.REQUIRED),
  password: Yup.string()
    .required(ValidationErrors.REQUIRED)
    .min(validationConstants.passwordMinLength, ValidationErrors.PASSWORD_INVALID)
    .matches(passwordRegexp, {
      message: ValidationErrors.PASSWORD_INVALID,
      excludeEmptyString: true,
    }),
});

export default SignupLoginSchema;
