/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, IconButton, InputAdornment, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { userRegistration } from 'store/reducers/userReducer/actions';

import { CustomButton, Input } from 'components';
import { APP_ROUTES } from 'constants/';
import { useAppDispatch, useEnhancedNavigate } from 'hooks';
import { snackActions } from 'utils';
import { validationSchema } from 'validators/signup';
import styles from './styles';

interface SignUpLayoutProps {}

type NavigateState = {
  from: Location;
};

export function SignUpPage(props: SignUpLayoutProps) {
  const { scrollNavigate } = useEnhancedNavigate();
  const location = useLocation();

  const formOptions = {
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(validationSchema),
  };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, dirtyFields } = formState;

  const isDirtyFields =
    !dirtyFields.name ||
    !dirtyFields.surname ||
    !dirtyFields.email ||
    !dirtyFields.password ||
    !dirtyFields.confirmPassword;

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const handleMouseUpPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FieldValues> = async (formData): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...requestData } = formData;
    dispatch(userRegistration(requestData));
    const from = (location.state as NavigateState)?.from.pathname || APP_ROUTES.SIGN_IN;
    scrollNavigate({ top: 0, left: 0, path: from, replace: true });
    snackActions.info('You have been registered. U can enter to the system.');
  };

  return (
    <Box component="main" css={styles.wrapperStyles}>
      <Box css={styles.innerStyles}>
        <Typography component="h1" css={styles.h1Style}>
          REGISTRATION
        </Typography>
        <form css={styles.formStyle} onSubmit={handleSubmit(onSubmit)}>
          <Input
            required
            label="First name"
            name="name"
            placeholder="Enter your first name"
            errorMsg={errors.name?.message as string}
            register={register}
          />
          <Input
            required
            label="Last name"
            name="surname"
            placeholder="Enter your surname"
            errorMsg={errors.surname?.message as string}
            register={register}
          />
          <Input
            required
            label="Email Address"
            name="email"
            type="email"
            placeholder="sunmait@gmail.com"
            errorMsg={errors.email?.message as string}
            register={register}
          />
          <Input
            required
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={showPassword ? 'text' : 'password'}
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
            errorMsg={errors.password?.message as string}
            register={register}
          />
          <Input
            required
            label="Confirm password"
            name="confirmPassword"
            placeholder="Confirm your password"
            type={showPassword ? 'text' : 'password'}
            errorMsg={errors.confirmPassword?.message as string}
            register={register}
          />
          <Box css={styles.buttonBox}>
            <Link to={APP_ROUTES.SIGN_IN} css={styles.linkStyle}>
              <CustomButton
                data-testid="return-btn"
                disabled={false}
                color="secondary"
                id="secondaryButton"
                variant="contained"
                type="button">
                Back
              </CustomButton>
            </Link>
            <CustomButton
              data-testid="submit-btn"
              disabled={isDirtyFields || false}
              color="primary"
              id="mainButton"
              variant="contained"
              type="submit">
              Sign up
            </CustomButton>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
