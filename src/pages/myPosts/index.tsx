/** @jsxImportSource @emotion/react */
import { Container, Pagination } from '@mui/material';
import { Post, PostSkeleton } from 'components';
import { CreatePost } from 'components/addPostForm';
import { Header } from 'components/header';
import { useAppDispatch } from 'hooks';
import { TagData } from 'store/tag/tag.reducer';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { setPageAction, setUserPostsAction } from 'store/post/post.actions';
import { selectCount, selectPosts } from 'store/post/post.selectors';
import { selectUserId } from 'store/user/user.selectors';

const POSTS_ON_PAGE = 5;

export function MyPosts() {
  const [createPostFrom, setCreatePostForm] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();

  const userId = useSelector(selectUserId);
  let posts = useSelector(selectPosts);
  posts = posts.filter((post) => post?.user);
  const count = useSelector(selectCount);

  const numberOfPages = Math.floor((count - 1) / POSTS_ON_PAGE + 1);

  useEffect(() => {
    dispatch(setUserPostsAction(userId));
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
      {posts.length ? (
        posts.map((post) => (
          <Post
            key={post!._id}
            _id={post!._id}
            title={post!.title}
            text={post!.text}
            user={post!.user}
            // @ts-ignore
            tags={post!.tags as TagData[]}
            count={post!.viewsCount}
          />
        ))
      ) : (
        <PostSkeleton />
      )}
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
