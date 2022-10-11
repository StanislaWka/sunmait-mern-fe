/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const tagStyle = css({
  borderRadius: '1em',
  padding: '3px',
  display: 'flex',
  alignItems: 'center',
  borderWidth: '1px',
  width: 'max-content',
  marginRight: '20px',
  marginBottom: '15px',
});

const selectedStyle = css({
  backgroundColor: '#F2F2F2',
});

const styles = {
  tagStyle,
  selectedStyle,
};

export default styles;
