import React from 'react';
import { Box } from '@mui/material';
import { Tag } from 'components';
import { useSelector } from 'react-redux';
import { selectTags } from 'store/tag/tag.selector';

interface Props {
  tagsId: string[];
  setTagsId: React.Dispatch<React.SetStateAction<string[]>>;
}

export function Tags({ tagsId, setTagsId }: Props) {
  const tags = useSelector(selectTags);

  const tagsElements = tags.map((tag) => {
    if (tagsId.some((selectedTag) => selectedTag === tag._id)) {
      return (
        <Tag
          name={tag.name}
          color={tag.color}
          _id={tag._id}
          isFilter
          isSelected
          tagsId={tagsId}
          setTagsId={setTagsId}
        />
      );
    }
    return (
      <Tag
        name={tag.name}
        color={tag.color}
        _id={tag._id}
        isFilter
        tagsId={tagsId}
        setTagsId={setTagsId}
      />
    );
  });
  return (
    <Box sx={{ marginBottom: '30px', display: 'flex', flexWrap: 'wrap' }}>
      {!!tags.length && tagsElements}
    </Box>
  );
}
