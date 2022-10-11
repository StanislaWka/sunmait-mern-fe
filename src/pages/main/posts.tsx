import { Box, Typography } from '@mui/material';
import { Post } from 'components';
import { PostState } from 'store/post/post.reducer';

interface Props {
  posts: PostState[];
}

export function Posts({ posts }: Props) {
  return (
    <Box>
      {posts.length ? (
        posts.map((post) => <Post post={post} />)
      ) : (
        <Typography variant="h1">NO POST YET</Typography>
      )}
    </Box>
  );
}
