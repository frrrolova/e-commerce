import * as Yup from 'yup';
import { FieldNames, ValidationErrors } from '../enums/auth-form.enum';
import { passwordRegexp } from './commonValidation';

const validationConstants = {
  passwordMinLength: 8,
};

const addressScheme = Yup.object().shape({
  street: Yup.string()
    .required(ValidationErrors.REQUIRED)
    .matches(/^[a-zA-Z-+ ]+$/, {
      message: ValidationErrors.ONLY_LETTERS,
      excludeEmptyString: true,
    }),
  city: Yup.string()
    .required(ValidationErrors.REQUIRED)
    .matches(/^[a-zA-Z-+ ]+$/, {
      message: ValidationErrors.ONLY_LETTERS,
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
  building: Yup.string().matches(/^[a-zA-Z0-9-+ ]+$/, {
    message: ValidationErrors.ONLY_LETTERS_AND_NUMBERS,
    excludeEmptyString: true,
  }),
  apartment: Yup.string().matches(/^[a-zA-Z0-9-+ ]+$/, {
    message: ValidationErrors.ONLY_LETTERS_AND_NUMBERS,
    excludeEmptyString: true,
  }),
});

const SignupSchema = Yup.object().shape({
  email: Yup.string().email(ValidationErrors.EMAIL_INVALID).required(ValidationErrors.REQUIRED),
  password: Yup.string()
    .required(ValidationErrors.REQUIRED)
    .min(validationConstants.passwordMinLength, ValidationErrors.SHORT_PASSWORD)
    .matches(passwordRegexp, {
      message: ValidationErrors.PASSWORD_INVALID,
      excludeEmptyString: true,
    }),
  firstName: Yup.string()
    .required(ValidationErrors.REQUIRED)
    .matches(/^[a-zA-Z-+]+$/, {
      message: ValidationErrors.ONLY_LETTERS,
      excludeEmptyString: true,
    }),
  lastName: Yup.string()
    .required(ValidationErrors.REQUIRED)
    .matches(/^[a-zA-Z]+$/, {
      message: ValidationErrors.ONLY_LETTERS,
      excludeEmptyString: true,
    }),
  dateOfBirth: Yup.date()
    .typeError(ValidationErrors.DATE_INVALID)
    .required(ValidationErrors.REQUIRED)
    .test(FieldNames.DATE_OF_BIRTH, ValidationErrors.TOO_YOUNG, function (birthdate?: Date) {
      if (birthdate) {
        const cutoff = new Date();
        cutoff.setFullYear(cutoff.getFullYear() - 13);
        return birthdate <= cutoff;
      }
      return true;
    }),
  shippingAddress: addressScheme,
  billingAddress: addressScheme,
});

export default SignupSchema;
