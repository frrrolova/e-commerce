import { FieldNames } from '../enums/auth-form.enum';

export const formFieldsConfig = {
  [FieldNames.EMAIL]: {
    label: '*Email',
    placeholder: 'Email',
    profileLabel: 'Email',
  },
  [FieldNames.PASSWORD]: {
    label: '*Password',
    placeholder: 'Password',
    profileLabel: 'Password',
  },
  [FieldNames.FIRST_NAME]: {
    label: '*First name',
    placeholder: 'First name',
    profileLabel: 'First name',
  },
  [FieldNames.LAST_NAME]: {
    label: '*Last name',
    placeholder: 'Last name',
    profileLabel: 'Last Name',
  },
  [FieldNames.DATE_OF_BIRTH]: {
    label: '*Date of birth',
    profileLabel: 'Date of Birth',
  },
  [FieldNames.STREET]: {
    label: '*Street',
    placeholder: 'Street',
    profileLabel: 'Street',
  },
  [FieldNames.CITY]: {
    label: '*City',
    placeholder: 'City',
    profileLabel: 'City',
  },
  [FieldNames.POSTAL_CODE]: {
    label: '*Postal code',
    placeholder: 'Postal code',
    profileLabel: 'City',
  },
  [FieldNames.COUNTRY]: {
    label: '*Country',
    id: 'country-input',
    labelId: 'country-label-id',
    profileLabel: 'Country',
  },
  [FieldNames.BUILDING]: {
    label: 'Building',
    placeholder: 'Building',
    profileLabel: 'Building',
  },
  [FieldNames.APARTMENT]: {
    label: 'Apartment',
    placeholder: 'Apartment',
    profileLabel: 'Apartment',
  },
};
