/** @jsxImportSource @emotion/react */
import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from 'hooks';
import { setDeleteIdTagAction } from 'store/tag/tag.actions';
import { deleteTagAction } from 'store/post/post.actions';

import styles from './styles';

interface Props {
  _id: string;
  name: string;
  color: string;
  idCompare?: boolean;
  isFilter?: boolean;
  tagsId?: string[];
  isSelected?: boolean;
  setTagsId?: React.Dispatch<React.SetStateAction<string[]>>;
}

export function Tag({
  _id,
  name,
  color,
  idCompare,
  isFilter,
  tagsId,
  setTagsId,
  isSelected,
}: Props) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (idCompare) {
      dispatch(deleteTagAction(_id));
    } else {
      dispatch(setDeleteIdTagAction(_id));
    }
  };

  const handleClickFilter = () => {
    if (isFilter && tagsId && setTagsId) {
      const index = tagsId?.indexOf(_id);
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      if (index !== -1) {
        tagsId.splice(index, 1);
        setTagsId([...tagsId]);
      } else {
        setTagsId((prev) => [...prev, _id]);
      }
    }
  };

  const selectedStyle = isSelected ? styles.selectedStyle : null;

  return (
    <Box css={[styles.tagStyle, selectedStyle]} sx={{ border: `3px solid ${color}` }}>
      <Typography onClick={handleClickFilter} sx={{ color, cursor: 'pointer' }}>
        {name}
      </Typography>
      {(idCompare === undefined || idCompare) && (
        <IconButton size="small" onClick={handleClick}>
          <CloseIcon />
        </IconButton>
      )}
    </Box>
  );
}
