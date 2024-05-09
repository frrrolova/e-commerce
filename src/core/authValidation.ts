import * as Yup from 'yup';

const validationConstants = {
  passwordMinLength: 8,
};

enum ValidationErrors {
  REQUIRED = 'Field is Required',
  EMAIL_INVALID = 'Invalid email',
  SHORT_PASSWORD = 'Should contain minimum 8 characters',
  PASSWORD_INVALID = 'Should contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
  VALUE_INVALID = 'Should contain only English letters',
  DATE_INVALID = 'Invalid date',
  TOO_YOUNG = 'You must be 14 years of age or older',
  POSTAL_CODE_INVALID = 'Invalid for chosen country',
}

export const SignupLoginSchema = Yup.object().shape({
  email: Yup.string().email(ValidationErrors.EMAIL_INVALID).required(ValidationErrors.REQUIRED),
  password: Yup.string()
    .required(ValidationErrors.REQUIRED)
    .min(validationConstants.passwordMinLength, ValidationErrors.SHORT_PASSWORD)
    .matches(/^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: ValidationErrors.PASSWORD_INVALID,
      excludeEmptyString: true,
    }),
});

const SignupSchema = Yup.object().shape({
  email: Yup.string().email(ValidationErrors.EMAIL_INVALID).required(ValidationErrors.REQUIRED),
  password: Yup.string()
    .required(ValidationErrors.REQUIRED)
    .min(validationConstants.passwordMinLength, ValidationErrors.SHORT_PASSWORD)
    .matches(/^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: ValidationErrors.PASSWORD_INVALID,
      excludeEmptyString: true,
    }),
  firstName: Yup.string()
    .required(ValidationErrors.REQUIRED)
    .matches(/^[a-zA-Z-+]+$/, {
      message: ValidationErrors.VALUE_INVALID,
      excludeEmptyString: true,
    }),
  lastName: Yup.string()
    .required(ValidationErrors.REQUIRED)
    .matches(/^[a-zA-Z]+$/, {
      message: ValidationErrors.VALUE_INVALID,
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
  street: Yup.string()
    .required(ValidationErrors.REQUIRED)
    .matches(/^[a-zA-Z-+]+$/, {
      message: ValidationErrors.VALUE_INVALID,
      excludeEmptyString: true,
    }),
  city: Yup.string()
    .required(ValidationErrors.REQUIRED)
    .matches(/^[a-zA-Z-+]+$/, {
      message: ValidationErrors.VALUE_INVALID,
      excludeEmptyString: true,
    }),
  country: Yup.string().required(ValidationErrors.REQUIRED),
  postalCode: Yup.string()
    .required('Required')
    .when('country', ([country], schema) => {
      if (country === 'DE') {
        return schema.matches(/^\d{5}$/, ValidationErrors.POSTAL_CODE_INVALID);
      } else if (country === 'AT') {
        return schema.matches(/^\d{4}$/, ValidationErrors.POSTAL_CODE_INVALID);
      } else if (country === 'GB') {
        return schema.matches(/^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/, ValidationErrors.POSTAL_CODE_INVALID);
      }
      return schema;
    }),
});

export default SignupSchema;
