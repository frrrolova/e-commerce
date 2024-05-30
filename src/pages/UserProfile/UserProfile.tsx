import UserProfileForm from '@/components/UserProfileForm/UserProfileForm';
import { userGetInfoThunk } from '@/store/slices/user/thunks';
import { useAppDispatch, useAppSelector } from '@/store/store';
import theme from '@/themes/theme';
import { Box, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import backImg from '/images/prof.png';

function UserProfile() {
  const isPageLoading = useAppSelector((state) => state.user.isUserDataLoading);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  // TODO: add err handling
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
          md: 'flex-start',
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
            md: 0,
          },
          opacity: {
            xs: 0.5,
            md: 1,
          },
        }}
        alt="Ficus"
        src={backImg}
      />
      <Typography
        component="h1"
        variant="h4"
        paddingX={2}
        marginY={'20px'}
        color={theme.palette.primary.main}
        letterSpacing={1.5}
      >
        Profile
      </Typography>
      {isPageLoading && <h3>Loading...</h3>}
      {user && <UserProfileForm userData={user} />}
    </Container>
  );
}

export default UserProfile;
