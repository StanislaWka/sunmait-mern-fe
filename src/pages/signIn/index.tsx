/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector, useEnhancedNavigate } from 'hooks';
import { useLocation } from 'react-router';

import { Input } from 'components';
import { APP_ROUTES } from 'constants/';
import { userLogin } from 'store/user/user.actions';
import { validationSchema } from 'validators/signIn';

import styles from './styles';

export type SignInForm = {
  email: string;
  password: string;
};

export function SignInPage() {
  const formOption = {
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(validationSchema),
  };
  const { handleSubmit, register, getValues, formState } = useForm(formOption);

  const { dirtyFields, errors } = formState;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleMouseUpPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const dispatch = useAppDispatch();
  const location = useLocation();
  const { scrollNavigate } = useEnhancedNavigate();
  const isAuth = useAppSelector((s) => s.userReducer.isAuth);

  const onSubmit: SubmitHandler<FieldValues> = async (formData): Promise<void> => {
    dispatch(userLogin(formData));
  };

  useEffect(() => {
    const from =
      (
        location.state as {
          from: Location;
        }
      )?.from.pathname || APP_ROUTES.HOME_PAGE;
    if (isAuth) scrollNavigate({ top: 0, left: 0, path: from, replace: true, behavior: 'smooth' });
  }, [isAuth]);

  const enableButton = () => {
    const values = getValues();
    return values;
  };

  enableButton();
  return (
    <Box css={styles.outerBoxStyle}>
      <Box css={styles.flexStyle}>
        <h1 css={styles.h1Style}>AUTHORIZATION</h1>
        <form css={styles.formStyle} onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="email"
            placeholder="example@sunmait.com"
            type="email"
            errorMsg={errors.email?.message as string}
            label="Email"
            required
            register={register}
          />
          <Input
            name="password"
            placeholder="Enter the password"
            type={showPassword ? 'text' : 'password'}
            errorMsg={errors.password?.message as string}
            label="Password"
            required
            register={register}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onMouseUp={handleMouseUpPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box css={styles.submitBtnDiv}>
            <LoadingButton
              css={styles.submitBtn}
              type="submit"
              variant="contained"
              onClick={enableButton}
              color="primary"
              disabled={!dirtyFields.email || !dirtyFields.password}
              loading={false}>
              Submit
            </LoadingButton>
          </Box>
        </form>
        <Box css={styles.helperDivStyle}>
          <Box css={styles.needAccountStyle}>
            <p css={styles.needAccountMsgStyle}>Need an account?</p>
            <Link css={styles.linkStyle} to={APP_ROUTES.SIGN_UP}>
              Sign Up!
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
