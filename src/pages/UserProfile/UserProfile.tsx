import UserProfileForm from '@/components/UserProfileForm/UserProfileForm';
import { userGetInfoThunk } from '@/store/slices/user/thunks';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Box, Container } from '@mui/material';
import { useEffect } from 'react';
import backImg from '/images/prof.webp';
import { formWidth, pageTitle } from './constants';
import Title from '@/components/Title/Title';

function UserProfile() {
  const isPageLoading = useAppSelector((state) => state.user.isUserDataLoading);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  // TODO: add err handling
  useEffect(() => {
    dispatch(userGetInfoThunk()).unwrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      sx={{
        position: 'relative',
        maxWidth: '100%',
        paddingX: 0,
        paddingBottom: 0,
        marginX: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: {
          xs: 'center',
        },
      }}
    >
      <Box
        component="img"
        sx={{
          position: 'fixed',
          height: '89%',
          zIndex: -1,
          top: 80,
          right: {
            xs: -135,
            lg: 0,
          },
          opacity: {
            xs: 0.5,
            md: 0.8,
            lg: 1,
          },
        }}
        alt="Ficus"
        src={backImg}
      />
      <Box className="mainTitle">
        <Title title={pageTitle} />
      </Box>
      {isPageLoading && <h3>Loading...</h3>}
      {user && <UserProfileForm userData={user} sxProps={formWidth} />}
    </Container>
  );
}

export default UserProfile;
