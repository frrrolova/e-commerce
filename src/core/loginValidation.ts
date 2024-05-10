import * as Yup from 'yup';
import { ValidationErrors } from '../enums/auth-form.enum';

const validationConstants = {
  passwordMinLength: 8,
};

const SignupLoginSchema = Yup.object().shape({
  email: Yup.string().email(ValidationErrors.EMAIL_INVALID).required(ValidationErrors.REQUIRED),
  password: Yup.string()
    .required(ValidationErrors.REQUIRED)
    .min(validationConstants.passwordMinLength, ValidationErrors.SHORT_PASSWORD)
    .matches(/^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: ValidationErrors.PASSWORD_INVALID,
      excludeEmptyString: true,
    }),
});

export default SignupLoginSchema;
