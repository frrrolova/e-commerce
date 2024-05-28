import UserProfileForm from '@/components/UserProfileForm/UserProfileForm';
import { userGetInfoThunk } from '@/store/slices/user/thunks';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect } from 'react';

function UserProfile() {
  const isPageLoading = useAppSelector((state) => state.user.isUserDataLoading);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(userGetInfoThunk())
      .unwrap()
      .then((resp) => {
        console.log(resp);
      })
      .catch((e) => {
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isPageLoading && <h3>Loading...</h3>}
      {user && <UserProfileForm userData={user} />}
    </>
  );
}

export default UserProfile;
