import { Customer, ErrorObject, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { Box, Paper } from '@mui/material';
import LabelBox from '../LabelBox/LabelBox';
import EditableInput from '../EditableInput/EditableInput';
import { FieldNames } from '@/enums/auth-form.enum';
import { formFieldsConfig } from '@/shared/auth-form.constants';
import { dateOfBirthSchema, emailSchema, firstNameSchema, lastNameSchema } from '@/core/commonValidation';
import EditableDatePicker from '../EditableDatepicker/EditableDatepicker';
import { useAppDispatch } from '@/store/store';
import { userUpdateThunk } from '@/store/slices/user/thunks';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { snackbarBasicParams } from '@/shared/snackbarConstans';
import { getFormattedDateValue } from '@/utils/getFormattedDateValue';

function UserProfileForm({ userData }: { userData: Customer }) {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [user, setUser] = useState<Customer>(userData);

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  function saveHandler(updAction: MyCustomerUpdateAction, fieldName: keyof typeof user, value: string) {
    setUser({ ...user, [fieldName]: value });
    dispatch(
      userUpdateThunk({
        updAction,
        version: user.version,
      }),
    )
      .unwrap()
      .catch((e) => {
        setUser(userData);
        const errors: ErrorObject[] = e.body.errors;
        if (errors) {
          errors.forEach((err) => {
            enqueueSnackbar(err.message, {
              variant: 'error',
              ...snackbarBasicParams,
            });
          });
        }
      });
  }

  return (
    <div>
      <Paper
        sx={{
          marginTop: 10,
          maxWidth: '60%',
          paddingX: 2,
          paddingY: 3,
        }}
      >
        <LabelBox label="Personal Info">
          <Box>
            <EditableInput
              name={FieldNames.EMAIL}
              initialValue={user?.email || ''}
              label={formFieldsConfig.email.profileLabel}
              schema={emailSchema}
              placeholder={formFieldsConfig.email.placeholder}
              onSave={(value) => {
                saveHandler(
                  {
                    action: 'changeEmail',
                    email: value,
                  },
                  FieldNames.EMAIL,
                  value,
                );
              }}
            />
            <EditableInput
              name={FieldNames.FIRST_NAME}
              initialValue={user?.firstName || ''}
              label={formFieldsConfig.firstName.profileLabel}
              schema={firstNameSchema}
              placeholder={formFieldsConfig.firstName.placeholder}
              onSave={(value) => {
                saveHandler(
                  {
                    action: 'setFirstName',
                    firstName: value,
                  },
                  FieldNames.FIRST_NAME,
                  value,
                );
              }}
            />
            <EditableInput
              name={FieldNames.LAST_NAME}
              initialValue={user?.lastName || ''}
              label={formFieldsConfig.lastName.profileLabel}
              schema={lastNameSchema}
              placeholder={formFieldsConfig.lastName.placeholder}
              onSave={(value) => {
                saveHandler(
                  {
                    action: 'setLastName',
                    lastName: value,
                  },
                  FieldNames.LAST_NAME,
                  value,
                );
              }}
            />
            <EditableDatePicker
              name={FieldNames.DATE_OF_BIRTH}
              initialValue={user?.dateOfBirth || ''}
              label={formFieldsConfig.dateOfBirth.profileLabel}
              schema={dateOfBirthSchema}
              onSave={(value) => {
                const dateValue = getFormattedDateValue(value);
                saveHandler(
                  {
                    action: 'setDateOfBirth',
                    dateOfBirth: dateValue,
                  },
                  FieldNames.DATE_OF_BIRTH,
                  dateValue,
                );
              }}
            />
          </Box>
        </LabelBox>
      </Paper>
    </div>
  );
}

export default UserProfileForm;
