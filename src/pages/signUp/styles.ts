/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const wrapperStyles = css({
  display: 'flex',
  minHeight: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  flexFlow: 'column wrap',
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

const innerStyles = css({
  display: 'flex',
  padding: '25px',
  minHeight: 'calc(100vh-3.75rem)',
  maxWidth: '700px',
  flexDirection: 'column',
  margin: 'auto',
  alignItems: 'center',
  width: '65%',
});
const formStyle = css({
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
  padding: '50px 20px 20px',
  borderRadius: '0.5em',
  borderTop: '10px solid rgba(0, 77, 215, 1)',
  boxShadow: '1px 1px 10px grey, -1px 0px 10px grey',
  '&>:nth-of-type(3)': {
    flex: '1 1 35rem',
  },
  '&>:last-of-type': {
    flex: '1 1 35rem',
  },
  '& > *': {
    flex: '1 1 15rem',
  },
});
const buttonBox = css({
  display: 'flex',
  justifyContent: 'space-evenly',
  '& button': {
    minWidth: '8rem',
  },
});

const paragraphErrorStyles = css({
  color: 'red',
});

const linkStyle = css({
  textDecoration: 'none',
});

const styles = {
  paragraphErrorStyles,
  wrapperStyles,
  h1Style,
  innerStyles,
  buttonBox,
  formStyle,
  linkStyle,
};

export default styles;
