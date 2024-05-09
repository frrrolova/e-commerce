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

interface RegInitialValues {
  [FieldNames.EMAIL]: string;
  [FieldNames.PASSWORD]: string;
  [FieldNames.FIRST_NAME]: string;
  [FieldNames.LAST_NAME]: string;
  [FieldNames.DATE_OF_BIRTH]: string;
  [FieldNames.STREET]: string;
  [FieldNames.CITY]: string;
  [FieldNames.POSTAL_CODE]: string;
  [FieldNames.COUNTRY]: string;
}

export const regInitialValues: RegInitialValues = {
  [FieldNames.EMAIL]: '',
  [FieldNames.PASSWORD]: '',
  [FieldNames.FIRST_NAME]: '',
  [FieldNames.LAST_NAME]: '',
  [FieldNames.DATE_OF_BIRTH]: '',
  [FieldNames.STREET]: '',
  [FieldNames.CITY]: '',
  [FieldNames.POSTAL_CODE]: '',
  [FieldNames.COUNTRY]: '',
};
