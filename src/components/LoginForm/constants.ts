export enum FieldNames {
  EMAIL = 'email',
  PASSWORD = 'password',
}

interface LoginInitialValues {
  [FieldNames.EMAIL]: string;
  [FieldNames.PASSWORD]: string;
}

export const loginInitialValues: LoginInitialValues = {
  [FieldNames.EMAIL]: '',
  [FieldNames.PASSWORD]: '',
};
