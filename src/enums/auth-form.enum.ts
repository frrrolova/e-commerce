export enum FieldNames {
  EMAIL = 'email',
  PASSWORD = 'password',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  DATE_OF_BIRTH = 'dateOfBirth',
  STREET = 'street',
  CITY = 'city',
  POSTAL_CODE = 'postalCode',
  COUNTRY = 'country',
}

export enum ValidationErrors {
  REQUIRED = 'Field is Required',
  EMAIL_INVALID = 'Invalid email',
  SHORT_PASSWORD = 'Should contain minimum 8 characters',
  PASSWORD_INVALID = 'Should contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
  VALUE_INVALID = 'Should contain only English letters',
  DATE_INVALID = 'Invalid date',
  TOO_YOUNG = 'You must be 14 years or older',
  POSTAL_CODE_INVALID = 'Invalid for chosen country',
}