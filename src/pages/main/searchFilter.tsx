import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { CustomButton } from 'components';
import { useAppDispatch } from 'hooks';
import { setFilterAction, setOrderAction } from 'store/post/post.actions';

const FILTER_MIN_LENGTH = 2;

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export function SearchFilter({ setPage }: Props) {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState('');

  const handleChange = (e: any) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    if (filter.length > FILTER_MIN_LENGTH || filter === '') {
      setPage(1);
      dispatch(setFilterAction(filter));
    }
  }, [filter]);

  const handleClick = (orderType: string) => {
    setPage(1);
    dispatch(setOrderAction(orderType));
  };

  return (
    <Box sx={{ width: '40%' }}>
      <Box sx={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          variant="standard"
          placeholder="Enter search filter"
          label="SEARCH"
          onChange={handleChange}
          sx={{ margin: 'auto' }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <CustomButton
          onClick={() => handleClick('mostViewed')}
          color="success"
          variant="contained"
          value="most viewed"
        />
        <CustomButton
          onClick={() => handleClick('newest')}
          color="success"
          variant="contained"
          value="newest"
        />
        <CustomButton
          onClick={() => handleClick('oldest')}
          color="success"
          variant="contained"
          value="oldest"
        />
      </Box>
    </Box>
  );
}
