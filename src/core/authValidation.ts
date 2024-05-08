import * as Yup from 'yup';

const validationConstants = {
  passwordMinLength: 8,
};

enum ValidationErrors {
  REQUIRED = 'Field is Required',
  EMAIL_INVALID = 'Invalid email',
  SHORT_PASSWORD = 'Should contain minimum 8 characters',
  PASSWORD_INVALID = 'Should contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
  NAME_INVALID = 'Should contain only English letters',
  DATE_INVALID = 'Invalid date',
  TOO_YOUNG = 'You must be 14 years of age or older',
}

const SignupSchema = Yup.object().shape({
  email: Yup.string().email(ValidationErrors.EMAIL_INVALID).required(ValidationErrors.REQUIRED),
  password: Yup.string()
    .required(ValidationErrors.REQUIRED)
    .min(validationConstants.passwordMinLength, ValidationErrors.SHORT_PASSWORD)
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])$/, {
      message: ValidationErrors.PASSWORD_INVALID,
      excludeEmptyString: true,
    }),
  firstName: Yup.string()
    .required(ValidationErrors.REQUIRED)
    .matches(/^[a-zA-Z-+]+$/, {
      message: ValidationErrors.NAME_INVALID,
      excludeEmptyString: true,
    }),
  lastName: Yup.string()
    .required(ValidationErrors.REQUIRED)
    .matches(/^[a-zA-Z]+$/, {
      message: ValidationErrors.NAME_INVALID,
      excludeEmptyString: true,
    }),
  dateOfBirth: Yup.date()
    .typeError(ValidationErrors.DATE_INVALID)
    .required(ValidationErrors.REQUIRED)
    // .max(new Date())
    .test('dateOfBirth', ValidationErrors.TOO_YOUNG, function (birthdate?: Date) {
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

export default SignupSchema;
