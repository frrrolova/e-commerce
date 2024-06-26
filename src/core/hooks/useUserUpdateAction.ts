import { SnackBarMsgs } from '@/components/UserProfileForm/constants';
import { userUpdateThunk } from '@/store/slices/user/thunks';
import { useAppDispatch } from '@/store/store';
import { Customer, ErrorObject, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { topSnackbarBasicParams } from '@/shared/snackbarConstans';

export function useUserUpdateAction(initialUserData: Customer) {
  const [user, setUser] = useState<Customer>(initialUserData);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();

  function makeAction(updAction: MyCustomerUpdateAction, successMsg: SnackBarMsgs = SnackBarMsgs.SUCCESS) {
    return dispatch(
      userUpdateThunk({
        updAction,
        version: user.version,
      }),
    )
      .unwrap()
      .then(() => {
        enqueueSnackbar(successMsg, {
          variant: 'success',
          ...topSnackbarBasicParams,
        });
      })
      .catch((e) => {
        setUser(initialUserData);
        const errors: ErrorObject[] = e.body.errors;
        if (errors) {
          errors.forEach((err) => {
            enqueueSnackbar(err.message, {
              variant: 'error',
              ...topSnackbarBasicParams,
            });
          });
        }
      });
  }

  function makeActionPreSuccessfully(
    updAction: MyCustomerUpdateAction,
    fieldName: keyof typeof user,
    value: string,
    successMsg?: SnackBarMsgs,
  ) {
    setUser({ ...user, [fieldName]: value });
    makeAction(updAction, successMsg);
  }

  return {
    makeAction,
    makeActionPreSuccessfully,
    user,
    setUser,
  };
}
