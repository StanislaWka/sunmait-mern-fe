/** @jsxImportSource @emotion/react */
import React from 'react';
import { Box, ButtonProps, Button } from '@mui/material';
import { Interpolation, SerializedStyles, Theme } from '@emotion/react';
import styles from './styles';

interface CustomButtonProps extends ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void> | Object;
  boxStyle?: SerializedStyles;
  css?: Interpolation<Theme>;
  dataTestId?: string;
}

export function CustomButton(props: CustomButtonProps) {
  const {
    onClick,
    children,
    value,
    boxStyle,
    css,
    dataTestId,
    type = 'button',
    ...otherProps
  } = props;
  return (
    <Box css={(styles.wrapperStyle, boxStyle)}>
      <Button data-testid={dataTestId} css={css} type={type} onClick={onClick} {...otherProps}>
        {children !== undefined ? children : value}
      </Button>
    </Box>
  );
}
