import React, { useEffect, useState } from 'react';
import { Box, Container, TextField } from '@mui/material';
import { CreatePost } from 'components/addPostForm';
import { Header } from 'components/header';
import { useAppDispatch } from 'hooks';
import { useSelector } from 'react-redux';
import { getAllPostsAction, setTagsIdAction } from 'store/post/post.actions';
import { selectPosts } from 'store/post/post.selectors';
import { getAllTagsAction, setNewTagNameAction } from 'store/tag/tag.actions';
import { SearchFilter } from './searchFilter';
import { CustomPagination } from './customPagination';
import { Posts } from './posts';
import { Tags } from './tags';

const LIMIT = 5;

export function MainPage() {
  const dispatch = useAppDispatch();
  const [createPostFrom, setCreatePostForm] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [page, setPage] = useState(1);

  const [tagsId, setTagsId] = useState<string[]>([]);

  useEffect(() => {
    dispatch(getAllPostsAction(LIMIT, page));
    dispatch(getAllTagsAction());
  }, []);

  let posts = useSelector(selectPosts);
  posts = posts.filter((post) => post?.user);

  const handleTagChange = (e: any) => {
    setNewTag(e.target.value);
  };

  const handleOnBlur = (e: any) => {
    e.target.value = '';
    if (newTag) {
      dispatch(setNewTagNameAction(newTag));
      setNewTag('');
    }
  };

  useEffect(() => {
    dispatch(setTagsIdAction(tagsId));
  }, [tagsId]);

  return (
    <Container maxWidth="lg">
      <Header setCreatePostForm={setCreatePostForm} />
      {createPostFrom && <CreatePost setCreatePostForm={setCreatePostForm} />}
      <h1> Welcome to MainPage</h1>
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Box sx={{ width: '40%' }}>
          <Box sx={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              variant="standard"
              placeholder="Enter new tag"
              label="Create new TAG"
              sx={{ margin: 'auto' }}
              onChange={handleTagChange}
              onBlur={handleOnBlur}
            />
          </Box>
          <Tags tagsId={tagsId} setTagsId={setTagsId} />
        </Box>
        <SearchFilter setPage={setPage} />
      </Box>
      <Posts posts={posts} />
      <CustomPagination setPage={setPage} page={page} />
    </Container>
  );
}
