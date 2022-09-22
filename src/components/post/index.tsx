/** @jsxImportSource @emotion/react */
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import { UserState } from 'store/reducers/userReducer';
import { deletePost, getOnePost } from 'store/reducers/postReducer/actions';
import { CustomButton } from 'components/button';
import { useAppDispatch, useAppSelector } from 'hooks';
import styles from './styles';
import AlertDialogSlide from './postDialog';

interface Props {
  _id: string;
  title: string;
  text: string;
  count: number;
  user: Partial<UserState>;
  tags: string[];
}

export function Post({ _id, title, text, count, user, tags }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useAppDispatch();
  // eslint-disable-next-line no-underscore-dangle
  const userId = useAppSelector((state) => state.userReducer._id);
  const [openModal, setOpenModal] = useState(false);

  const handleDeletePost = () => {
    dispatch(deletePost(_id));
  };

  const handleOpenPost = () => {
    dispatch(getOnePost(_id));
    setOpenModal(true);
  };

  // eslint-disable-next-line no-underscore-dangle
  const idCompare = userId === user._id;

  return (
    <Box css={styles.mainBox}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          backgroundColor: '#B8EF89',
          cursor: 'pointer',
        }}>
        <Typography variant="h2">{title}</Typography>
        {idCompare && (
          <IconButton onClick={handleDeletePost}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      <ul>
        {tags.map((tag) => (
          <li>{tag}</li>
        ))}
      </ul>
      <Box>
        <Box>Views {count}</Box>
        <Box>
          Author: {user.name} {user.surname}
        </Box>
        <Box>
          <CustomButton variant="contained" onClick={handleOpenPost} value="Read Post" />
        </Box>
      </Box>
      <AlertDialogSlide open={openModal} setOpen={setOpenModal} />
    </Box>
  );
}
