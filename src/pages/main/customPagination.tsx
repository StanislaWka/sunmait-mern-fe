import { Pagination } from '@mui/material';
import { useAppDispatch } from 'hooks';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { setPageAction } from 'store/post/post.actions';
import { selectCount } from 'store/post/post.selectors';

const POSTS_ON_PAGE = 5;

export function CustomPagination() {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const count = useSelector(selectCount);
  const numberOfPages = Math.floor((count - 1) / POSTS_ON_PAGE + 1);

  const handlePagination = (e: any) => {
    if (page !== +e.target.innerText) {
      setPage(+e.target.innerText);
      dispatch(setPageAction(+e.target.innerText));
    }
  };

  return (
    <Pagination
      count={numberOfPages}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '50px',
      }}
      onChange={handlePagination}
      variant="outlined"
      color="primary"
    />
  );
}
