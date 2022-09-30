/* eslint-disable @typescript-eslint/no-magic-numbers */
import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useSelector } from 'react-redux';
import { selectTags } from 'store/tag/tag.selector';

interface Props {
  tagName: { id: string; name: string }[];
  setTagName: React.Dispatch<React.SetStateAction<{ id: string; name: string }[]>>;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(
  name: string,
  personName: readonly { id: string; name: string }[],
  theme: Theme,
) {
  return {
    fontWeight: personName.some((tag) => tag.name === name)
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium,
  };
}

export default function TagSelect({ tagName, setTagName }: Props) {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof tagName>) => {
    const {
      target: { value },
    } = event;

    setTagName(
      // On autofill we get a stringified value.
      value as { id: string; name: string }[],
    );
  };

  const tags = useSelector(selectTags);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={tagName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value.id} label={value.name} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}>
          {tags.map((tag) => (
            <MenuItem
              key={tag._id}
              value={{ id: tag._id, name: tag.name } as any}
              sx={{ color: tag.color }}
              style={getStyles(tag.name, tagName, theme)}>
              {tag.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
