import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { UserStatistic } from 'api/models/statistic';
import { Header } from 'components/header';
import { useAppDispatch } from 'hooks';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getStatisticAction } from 'store/statistic/statistic.actions';
import { selectUserStatistic } from 'store/statistic/statistic.selectors';

// interface Props {}

export function StatisticPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getStatisticAction());
  }, []);

  const userStatistic: UserStatistic[] = useSelector(selectUserStatistic);

  console.log(userStatistic);

  return (
    <Container maxWidth="lg">
      <Header />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User FullName)</TableCell>
              <TableCell align="right">Create posts</TableCell>
              <TableCell align="right">Title of latest create post</TableCell>
              <TableCell align="right">Date of last created posts</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userStatistic.length
              ? userStatistic.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">{`${row.name} ${row.surname}`}</TableCell>
                    <TableCell align="right">{row.posts.length}</TableCell>
                    <TableCell align="right">{row.posts[0] ? row.posts[0].title : '–'}</TableCell>
                    <TableCell align="right">
                      {row.posts[0]
                        ? new Date(row.posts[0].createdAt).toLocaleString().split(',')[0]
                        : '–'}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
