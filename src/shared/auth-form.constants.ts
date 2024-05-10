import { FieldNames } from '../enums/auth-form.enum';

export const formFieldsConfig = {
  [FieldNames.EMAIL]: {
    label: 'Email',
    placeholder: 'Email',
  },
  [FieldNames.PASSWORD]: {
    label: 'Password',
    placeholder: 'Password',
  },
  [FieldNames.FIRST_NAME]: {
    label: 'First name',
    placeholder: 'First name',
  },
  [FieldNames.LAST_NAME]: {
    label: 'Last name',
    placeholder: 'Last name',
  },
  [FieldNames.STREET]: {
    label: 'Street',
    placeholder: 'Street',
  },
  [FieldNames.CITY]: {
    label: 'City',
    placeholder: 'City',
  },
  [FieldNames.POSTAL_CODE]: {
    label: 'Postal code',
    placeholder: 'Postal code',
  },
  [FieldNames.COUNTRY]: {
    label: 'Country',
    id: 'country-input',
    labelId: 'country-label-id',
  },
};
