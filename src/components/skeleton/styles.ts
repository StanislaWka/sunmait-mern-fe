/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const skeletonStyle = css({
  backgroundColor: 'fff',
  border: '1px solid #dedede',
  borderRadius: '6px',
  overflow: 'hidden',
  marginBottom: '15px',
});

const skeletonUser = css({
  display: 'flex',
});

const styles = { skeletonStyle, skeletonUser };

export default styles;
