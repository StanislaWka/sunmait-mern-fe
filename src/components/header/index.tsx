import { Box, Typography } from '@mui/material';
import { CustomButton } from 'components/button';
import { APP_ROUTES } from 'constants/';
import { useAppDispatch, useEnhancedNavigate } from 'hooks';
import React from 'react';
import { useLocation } from 'react-router';
import { clearStateAction } from 'store/user/user.actions';

type NavigateState = {
  from: Location;
};

interface Props {
  setCreatePostForm: (props: boolean) => void;
}

export function Header({ setCreatePostForm }: Props) {
  const { scrollNavigate } = useEnhancedNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();

  const logOut = () => {
    localStorage.removeItem('accessToken');
    dispatch(clearStateAction());
    const from = (location.state as NavigateState)?.from.pathname || APP_ROUTES.SIGN_IN;
    scrollNavigate({ top: 0, left: 0, path: from, replace: true });
  };

  const navigateToMinePosts = () => {
    const from = (location.state as NavigateState)?.from.pathname || APP_ROUTES.MY_POSTS;
    scrollNavigate({ top: 0, left: 0, path: from, replace: true });
  };

  const navigateToMainPage = () => {
    const from = (location.state as NavigateState)?.from.pathname || APP_ROUTES.HOME_PAGE;
    scrollNavigate({ top: 0, left: 0, path: from, replace: true });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: '10px' }}>
      <Typography onClick={navigateToMainPage} sx={{ cursor: 'pointer' }}>
        Welcome to my blog{' '}
      </Typography>
      <CustomButton
        variant="contained"
        color="info"
        onClick={navigateToMinePosts}
        value="My Posts"
      />
      <Box sx={{ display: 'flex' }}>
        <CustomButton
          variant="contained"
          onClick={() => setCreatePostForm(true)}
          value="Create New Post"
          sx={{ marginRight: '50px' }}
        />
        <CustomButton variant="contained" color="error" onClick={logOut} value="exit" />
      </Box>
    </Box>
  );
}
