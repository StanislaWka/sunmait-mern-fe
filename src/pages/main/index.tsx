import { Container } from '@mui/material';
import { PostSkeleton } from 'components';
import { CreatePost } from 'components/addPostForm';
import { Header } from 'components/header';
import { Post } from 'components/post';
import { useAppDispatch, useAppSelector } from 'hooks';
import React, { useEffect, useState } from 'react';
import { getAllPosts } from 'store/reducers/postReducer/actions';

export function MainPage() {
  const dispatch = useAppDispatch();
  const [createPostFrom, setCreatePostForm] = useState(false);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  let posts = useAppSelector((state) => state.postReducer.posts);
  posts = posts.filter((post) => post?.user);

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
