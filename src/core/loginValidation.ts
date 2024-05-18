import * as Yup from 'yup';
import { ValidationErrors } from '../enums/auth-form.enum';
import { passwordRegexp } from './commonValidation';

const validationConstants = {
  passwordMinLength: 8,
};

const SignupLoginSchema = Yup.object().shape({
  email: Yup.string().email(ValidationErrors.EMAIL_INVALID).required(ValidationErrors.REQUIRED),
  password: Yup.string()
    .required(ValidationErrors.REQUIRED)
    .min(validationConstants.passwordMinLength, ValidationErrors.SHORT_PASSWORD)
    .matches(passwordRegexp, {
      message: ValidationErrors.PASSWORD_INVALID,
      excludeEmptyString: true,
    }),
});

export default SignupLoginSchema;
