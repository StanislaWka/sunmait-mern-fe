/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import { ConstructionOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Container, Divider } from '@mui/material';
import { CustomButton } from 'components/button';
import { Input } from 'components/input';
import { useAppDispatch, useAppSelector } from 'hooks';
import React from 'react';
import { FieldValue, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { createPostAction } from 'store/post/post.actions';
import { validationSchema } from 'validators/createPost';
import { string } from 'yup';
import styles from './styles';

interface Props {
  setCreatePostForm: (prop: boolean) => void;
}

interface AddPostFields {
  title: string;
  text: string;
}

export function CreatePost({ setCreatePostForm }: Props) {
  const { _id } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const formOptions = {
    defaultValues: {
      title: '',
      text: '',
    },
    resolver: yupResolver(validationSchema),
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, dirtyFields },
  } = useForm(formOptions);

  const handleCreatePost: SubmitHandler<FieldValues> = async (formData): Promise<void> => {
    dispatch(createPostAction(formData.title, formData.text));
    setCreatePostForm(false);
  };

  const enableButton = () => {
    const values = getValues();
    return values;
  };

  enableButton();

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit(handleCreatePost)}>
        <Box>
          <Input
            name="title"
            label="Title"
            placeholder="enter title"
            variant="outlined"
            register={register}
          />
          <Input
            name="text"
            placeholder="enter text"
            label="Text"
            variant="outlined"
            register={register}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1rem',
            marginBottom: '30px',
          }}>
          <LoadingButton
            type="submit"
            // onClick={handleSubmit(handleCreatePost)}
            onClick={enableButton}
            sx={{ width: '30%' }}
            // @ts-ignore
            disabled={!dirtyFields.title || !dirtyFields.text}
            loading={false}
            variant="contained">
            Add task
          </LoadingButton>
          <CustomButton
            boxStyle={styles.boxStyle}
            type="button"
            color="secondary"
            variant="contained"
            sx={{ width: '100%' }}
            dataTestId="add_task-close-button"
            value="Close"
            onClick={() => setCreatePostForm(false)}
          />
        </Box>
      </form>
      <Divider />
    </Container>
  );
}
