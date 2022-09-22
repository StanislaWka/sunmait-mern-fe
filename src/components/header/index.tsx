import { Box } from '@mui/material';
import { CustomButton } from 'components/button';
import React from 'react';

interface Props {
  setCreatePostForm: (props: boolean) => void;
}

export function Header({ setCreatePostForm }: Props) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: '10px' }}>
      Welcome to my blog{' '}
      <Box>
        <CustomButton
          variant="contained"
          onClick={() => setCreatePostForm(true)}
          value="Create New Post"
        />
      </Box>
    </Box>
  );
}
