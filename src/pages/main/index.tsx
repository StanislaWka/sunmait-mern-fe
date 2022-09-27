import { Container } from '@mui/material';
import { PostSkeleton } from 'components';
import { CreatePost } from 'components/addPostForm';
import { Header } from 'components/header';
import { Post } from 'components/post';
import { APP_ROUTES } from 'constants/';
import { useAppDispatch, useAppSelector, useEnhancedNavigate } from 'hooks';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getAllPostsAction } from 'store/post/post.actions';
import { TYPES } from 'store/user/typesOfAction';
import { getUserId } from 'utils';

type NavigateState = {
  from: Location;
};

export function MainPage() {
  const dispatch = useAppDispatch();
  const { scrollNavigate } = useEnhancedNavigate();
  const { _id: userId, isAuth } = useAppSelector((state) => state.userReducer);
  const [createPostFrom, setCreatePostForm] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!isAuth) {
      const from = (location.state as NavigateState)?.from.pathname || APP_ROUTES.SIGN_IN;
      // eslint-disable-next-line no-use-before-define
      scrollNavigate({ top: 0, left: 0, path: from, replace: true });
    }
  }, [isAuth]);

  useEffect(() => {
    dispatch(getAllPostsAction());
  }, []);

  let posts = useAppSelector((state) => state.postReducer.posts);
  posts = posts.filter((post) => post?.user);

  if (!userId) {
    const userData = getUserId();
    if (userData) {
      dispatch({ type: TYPES.SET_CREDENTIALS, payload: { ...userData, isAuth: true } });
    }
  }

  return (
    <Container maxWidth="lg">
      <Header setCreatePostForm={setCreatePostForm} />
      {createPostFrom && <CreatePost setCreatePostForm={setCreatePostForm} />}
      <h1> Welcome to MainPage</h1>
      {posts.length ? (
        posts.map((post) => (
          <Post
            // eslint-disable-next-line no-underscore-dangle
            key={post!._id}
            // eslint-disable-next-line no-underscore-dangle
            _id={post!._id}
            title={post!.title}
            text={post!.text}
            user={post!.user}
            tags={post!.tags}
            count={post!.viewsCount}
          />
        ))
      ) : (
        <PostSkeleton />
      )}
    </Container>
  );
}
