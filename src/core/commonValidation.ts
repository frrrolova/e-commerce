import { FieldNames, ValidationErrors } from '@/enums/auth-form.enum';
import * as Yup from 'yup';

const validationConstants = {
  passwordMinLength: 8,
};

export const passwordRegexp = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n ])(?=.*[A-Z])(?=.*[a-z])\S*$/;

export const emailRegexp = /^[\w-.]+@([\w-]+\.)+[\w-]+$/;

export const emailSchema = Yup.string()
  .matches(emailRegexp, {
    message: ValidationErrors.EMAIL_INVALID,
    excludeEmptyString: true,
  })
  .required(ValidationErrors.REQUIRED);

export const passwordSchema = Yup.string()
  .required(ValidationErrors.REQUIRED)
  .min(validationConstants.passwordMinLength, ValidationErrors.PASSWORD_INVALID)
  .matches(passwordRegexp, {
    message: ValidationErrors.PASSWORD_INVALID,
    excludeEmptyString: true,
  });

export const firstNameSchema = Yup.string()
  .required(ValidationErrors.REQUIRED)
  .matches(/^[a-zA-Z]+$/, {
    message: ValidationErrors.ONLY_LETTERS,
    excludeEmptyString: true,
  });

export const lastNameSchema = Yup.string()
  .required(ValidationErrors.REQUIRED)
  .matches(/^[a-zA-Z]+$/, {
    message: ValidationErrors.ONLY_LETTERS,
    excludeEmptyString: true,
  });

export const dateOfBirthSchema = Yup.date()
  .typeError(ValidationErrors.DATE_INVALID)
  .required(ValidationErrors.REQUIRED)
  .test(FieldNames.DATE_OF_BIRTH, ValidationErrors.TOO_YOUNG, function (birthdate?: Date) {
    if (birthdate) {
      const cutoff = new Date();
      cutoff.setFullYear(cutoff.getFullYear() - 14);
      return birthdate <= cutoff;
    }
    return true;
  });

export const addressSchema = Yup.object().shape({
  streetName: Yup.string().required(ValidationErrors.REQUIRED),
  city: Yup.string()
    .required(ValidationErrors.REQUIRED)
    .matches(/^[a-zA-Z ]+$/, {
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
