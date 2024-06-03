import EditableInput from '@/components/Editable/EditableInput/EditableInput';
import { dateOfBirthSchema, emailSchema, firstNameSchema, lastNameSchema } from '@/core/commonValidation';
import { FieldNames } from '@/enums/auth-form.enum';
import { formFieldsConfig } from '@/shared/auth-form.constants';
import { Customer, ErrorObject } from '@commercetools/platform-sdk';
import { SnackBarMsgs } from '../constants';
import EditableDatePicker from '@/components/Editable/EditableDatepicker/EditableDatepicker';
import { getFormattedDateValue } from '@/utils/getFormattedDateValue';
import { Button, Dialog, Divider } from '@mui/material';
import ChangePasswordForm from '@/components/ChangePasswordForm/ChangePasswordForm';
import { useEffect, useState } from 'react';
import { useUserUpdateAction } from '@/core/hooks/useUserUpdateAction';
import { useAppDispatch } from '@/store/store';
import { changePasswordThunk } from '@/store/slices/user/thunks';
import { snackbarBasicParams } from '@/shared/snackbarConstans';
import { useSnackbar } from 'notistack';

export function UserDetails({ userData }: { userData: Customer }) {
  const { makeActionPreSuccessfully, user, setUser } = useUserUpdateAction(userData);
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setUser(userData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  function changePasswordHandler(currentPassword: string, newPassword: string) {
    return dispatch(changePasswordThunk({ version: user.version, currentPassword, newPassword }))
      .unwrap()
      .then(() => {
        enqueueSnackbar(SnackBarMsgs.PASSWORD_CHANGED, {
          variant: 'success',
          ...snackbarBasicParams,
        });
      })
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

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  return (
    <>
      <Divider>Info</Divider>
      <EditableInput
        name={FieldNames.EMAIL}
        initialValue={user?.email || ''}
        label={formFieldsConfig.email.profileLabel}
        schema={emailSchema}
        placeholder={formFieldsConfig.email.placeholder}
        onSave={(value) => {
          makeActionPreSuccessfully(
            {
              action: 'changeEmail',
              email: value,
            },
            FieldNames.EMAIL,
            value,
            SnackBarMsgs.EMAIL_SUCCESS,
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
          makeActionPreSuccessfully(
            {
              action: 'setFirstName',
              firstName: value,
            },
            FieldNames.FIRST_NAME,
            value,
            SnackBarMsgs.FIRST_NAME_SUCCESS,
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
          makeActionPreSuccessfully(
            {
              action: 'setLastName',
              lastName: value,
            },
            FieldNames.LAST_NAME,
            value,
            SnackBarMsgs.LAST_NAME_SUCCESS,
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
          makeActionPreSuccessfully(
            {
              action: 'setDateOfBirth',
              dateOfBirth: dateValue,
            },
            FieldNames.DATE_OF_BIRTH,
            dateValue,
            SnackBarMsgs.DOB_SUCCESS,
          );
        }}
      />
      <Divider>Password</Divider>
      <Button variant="outlined" onClick={handleDialogOpen}>
        Change Password
      </Button>
      <Dialog onClose={handleDialogClose} open={dialogOpen}>
        <ChangePasswordForm
          onClose={handleDialogClose}
          onSubmit={(currentPass, newPass) => {
            // console.log(currentPass, newPass);
            changePasswordHandler(currentPass, newPass);
          }}
        />
      </Dialog>
    </>
  );
}
