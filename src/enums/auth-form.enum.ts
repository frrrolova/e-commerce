export enum FieldNames {
  EMAIL = 'email',
  PASSWORD = 'password',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  DATE_OF_BIRTH = 'dateOfBirth',
  COUNTRY = 'country',
  CITY = 'city',
  STREET = 'street',
  BUILDING = 'building',
  APARTMENT = 'apartment',
  POSTAL_CODE = 'postalCode',
}

export enum AddressTypes {
  SHIPPING = 'shippingAddress',
  BILLING = 'billingAddress',
}

export enum ValidationErrors {
  REQUIRED = 'Field is Required',
  EMAIL_INVALID = 'Invalid email',
  SHORT_PASSWORD = 'Should contain minimum 8 characters',
  PASSWORD_INVALID = 'Should contain only English letters at least 1 uppercase, 1 lowercase and 1 number',
  ONLY_LETTERS = 'Should not contain numbers or special characters',
  DATE_INVALID = 'Invalid date',
  TOO_YOUNG = 'You must be 14 years or older',
  POSTAL_CODE_INVALID = 'Invalid for chosen country',
  ONLY_LETTERS_AND_NUMBERS = 'Should contain only English letters and numbers',
}

export enum RegistrationResults {
  SUCCESS = 'success',
  ERROR = 'error',
}
export enum RegistrationResultMessages {
  SUCCESS = 'Successful Registration!',
  ERR_ALREADY_EXIST = 'Please, log in or use another email address',
}

export enum RegistrationErrors {
  ALREADY_EXIST = 'DuplicateField',
}

export enum LoginResults {
  SUCCESS = 'success',
  ERROR = 'error',
}
export enum LoginResultMessages {
  SUCCESS = 'Successful Authentication!',
  NOT_FOUND = 'Account with the given credentials not found',
}

export enum LoginErrors {
  NOT_FOUND = 'InvalidCredentials',
}
