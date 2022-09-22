/** @jsxImportSource @emotion/react */
import React from 'react';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';

import styles from './styles';

export function PostSkeleton() {
  return (
    <Box css={styles.skeletonStyle}>
      <Stack spacing={1}>
        <Skeleton variant="rectangular" width="100%" height={300} />
        <Box sx={{ padding: '20px' }}>
          <Box css={styles.skeletonUser}>
            <Box sx={{ marginLeft: '50px' }}>
              <Skeleton variant="circular" width={40} height={40} style={{ marginRight: 10 }} />
              <Skeleton variant="text" width={60} height={20} />
              <Skeleton variant="text" width={100} height={15} />
            </Box>
          </Box>
          <Box sx={{ marginLeft: '50px' }}>
            <Skeleton variant="text" width="80%" height={45} />
            <Box sx={{ display: 'flex' }}>
              <Skeleton sx={{ marginRight: '15px' }} variant="text" width={40} height={30} />
              <Skeleton sx={{ marginRight: '15px' }} variant="text" width={40} height={30} />
              <Skeleton sx={{ marginRight: '15px' }} variant="text" width={40} height={30} />
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
