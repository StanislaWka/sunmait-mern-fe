/** @jsxImportSource @emotion/react */
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PostState } from 'store/post/post.reducer';
import React, { useState } from 'react';
import { setDeleteIdPostAction, getOnePostAction } from 'store/post/post.actions';
import { Tag } from 'components';
import { CustomButton } from 'components/button';
import { useAppDispatch } from 'hooks';
import { useSelector } from 'react-redux';
import { selectUserId } from 'store/user/user.selectors';
import styles from './styles';
import AlertDialogSlide from './postDialog';

interface Props {
  post: PostState;
}

export function Post({ post }: Props) {
  const { _id, title, viewsCount, user, tags } = post;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useAppDispatch();
  // eslint-disable-next-line no-underscore-dangle
  const userId = useSelector(selectUserId);

  const [openModal, setOpenModal] = useState(false);

  const handleDeletePost = () => {
    dispatch(setDeleteIdPostAction(_id));
  };

  const handleOpenPost = () => {
    dispatch(getOnePostAction(_id));
    setOpenModal(true);
  };

  // eslint-disable-next-line no-underscore-dangle
  const idCompare = userId === user._id;

  return (
    <Box css={styles.mainBox} key={_id}>
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
      <Box sx={{ marginBottom: '15px', marginTop: '20px', display: 'flex' }}>
        {!!tags.length &&
          tags.map((tag) => (
            <Tag name={tag.name} color={tag.color} _id={tag._id} idCompare={idCompare} />
          ))}
      </Box>
      <Box>
        <Box>Views {viewsCount}</Box>
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
