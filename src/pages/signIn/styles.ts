/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const outerBoxStyle = css({
  padding: '150px 0 0',
  margin: '0',
  display: 'flex',
});

const flexStyle = css({
  display: 'flex',
  padding: '25px',
  minHeight: 'calc(100vh-3.75rem)',
  maxWidth: '700px',
  flexDirection: 'column',
  margin: 'auto',
  alignItems: 'center',
  width: '50%',
});
const h1Style = css({
  bottom: '2rem',
  padding: '0.5rem',
  textAlign: 'center',
  fontWeight: '900',
  fontSize: '40px',
  fontFamily: 'Lato, sans-serif',
  '&:after': {
    content: '""',
    display: 'block',
    border: '2px solid #004ED7',
    backgroundColor: '#004DE7',
    margin: '40px auto 10px',
    width: '66%',
    textAlign: 'center',
  },
});

const formStyle = css({
  width: '100%',
  padding: '50px 20px 20px',
  borderRadius: '0.5em',
  borderTop: '10px solid rgba(0, 77, 215, 1)',
  boxShadow: '1px 1px 10px grey, -1px 0px 10px grey',
});
const helperDivStyle = css({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  padding: '1rem',
});

const needAccountStyle = css({
  display: 'flex',
  alignItems: 'baseline',
  minWidth: '150px',
  marginBottom: '20px',
  marginRight: '10px',
});

const needAccountMsgStyle = css({
  marginRight: '10px',
  fontSize: '16px',
  color: '#A7A7A7',
  flexGrow: '0',
  fontFamily: 'Lato, sans-serif',
});

const linkStyle = css({
  fontSize: '16px',
  fontFamily: 'Lato, sans-serif',
  color: 'black',
  textDecoration: 'none',
  '&:link': {
    color: '#004DE7',
  },
  '&:hover': {
    color: '#004DE7',
    transition: 'all 0.3s ease-in',
  },
  '&:after': {
    margin: 'auto',
    content: '""',
    display: 'block',
    width: '0%',
    paddingTop: '5px',
    borderBottom: '1px solid #004DE7',
    transition: 'all 0.3s ease-in',
  },
  '&:hover:after': {
    width: '100%',
  },
});

const parentBtnStyle = css({
  flexGrow: '0',
});

const submitBtnDiv = css({
  margin: '1rem',
});

const submitBtn = css({
  height: '40px',
  width: '100%',
  fontFamily: 'Lato, sans-serif',
});

const forgotPasswordBtnStyle = css({
  width: '100%',
  fontFamily: 'Lato, sans-serif',
});

const circularProgressBox = css({
  height: '60px',
});

const linkEmptyStyle = css({
  fontSize: '14px',
  fontFamily: 'Lato, sans-serif',
  lineHeight: '2.5',
  color: 'black',
  textDecoration: 'none',
});

const styles = {
  flexStyle,
  h1Style,
  formStyle,
  helperDivStyle,
  needAccountStyle,
  needAccountMsgStyle,
  submitBtn,
  outerBoxStyle,
  forgotPasswordBtnStyle,
  parentBtnStyle,
  submitBtnDiv,
  circularProgressBox,
  linkStyle,
  linkEmptyStyle,
};

export default styles;
