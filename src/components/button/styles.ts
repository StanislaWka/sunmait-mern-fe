import { css } from '@emotion/react';

const wrapperStyle = css({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'red',
  minHeight: '50px',
  width: '200px',
});
const inputLabelStyle = css({
  color: 'darkcyan',
  fontWeight: 500,
});

const styles = {
  wrapperStyle,
  inputLabelStyle,
};

export default styles;
