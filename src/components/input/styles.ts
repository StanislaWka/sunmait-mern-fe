/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const wrapperStyles = css({
  width: '100%',
  display: 'flex',
  flexFlow: 'column wrap',
  padding: '1rem',
});

const paragraphErrorStyles = css({
  color: 'red',
});

const inputWidthStyle = css({
  width: '75%',
});

const inputProps = css({
  fontSize: '16px',
});

const textFieldStyles = css({
  width: '100%',
  '& label.Mui-focused': {
    color: '#004DE7',
  },
  '& .Mui-focused:after': {
    borderBottomColor: '#004DE7',
  },
});

const styles = {
  paragraphErrorStyles,
  wrapperStyles,
  inputWidthStyle,
  textFieldStyles,
  inputProps,
};

export default styles;
