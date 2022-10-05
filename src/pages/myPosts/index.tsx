/** @jsxImportSource @emotion/react */
import { Container, Pagination } from '@mui/material';
import { Post, PostSkeleton } from 'components';
import { CreatePost } from 'components/addPostForm';
import { Header } from 'components/header';
import { useAppDispatch } from 'hooks';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { setPageAction, setUserPostsAction } from 'store/post/post.actions';
import { selectCount, selectPosts } from 'store/post/post.selectors';

const POSTS_ON_PAGE = 5;

export function MyPosts() {
  const [createPostFrom, setCreatePostForm] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();

  let posts = useSelector(selectPosts);
  posts = posts.filter((post) => post?.user);
  const count = useSelector(selectCount);

  const numberOfPages = Math.floor((count - 1) / POSTS_ON_PAGE + 1);

  useEffect(() => {
    dispatch(setUserPostsAction(POSTS_ON_PAGE, page));
  }, []);

  const handlePagination = (e: any) => {
    if (page !== +e.target.innerText) {
      setPage(+e.target.innerText);
      dispatch(setPageAction(+e.target.innerText));
    }
  };

  return (
    <Container maxWidth="lg">
      <Header setCreatePostForm={setCreatePostForm} />
      {createPostFrom && <CreatePost setCreatePostForm={setCreatePostForm} />}
      {posts.length ? posts.map((post) => <Post post={post} />) : <PostSkeleton />}
      <Pagination
        count={numberOfPages}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '50px',
        }}
        onChange={handlePagination}
        variant="outlined"
        color="primary"
      />
    </Container>
  );
}
