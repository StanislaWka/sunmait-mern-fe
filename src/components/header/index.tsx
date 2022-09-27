import { Box } from '@mui/material';
import { CustomButton } from 'components/button';
import { useAppDispatch } from 'hooks';
import React from 'react';
import { clearState } from 'store/user/user.actions';

interface Props {
  setCreatePostForm: (props: boolean) => void;
}

export function Header({ setCreatePostForm }: Props) {
  const dispatch = useAppDispatch();
  const logOut = () => {
    localStorage.removeItem('accessToken');
    dispatch(clearState());
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: '10px' }}>
      Welcome to my blog{' '}
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
