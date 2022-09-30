import { Box } from '@mui/material';
import { Post, PostSkeleton } from 'components';
import { PostState } from 'store/post/post.reducer';
import { TagData } from 'store/tag/tag.reducer';

interface Props {
  posts: PostState[];
}

export function Posts({ posts }: Props) {
  return (
    <Box>
      {posts.length ? (
        posts.map((post) => (
          <Post
            key={post!._id}
            _id={post!._id}
            title={post!.title}
            text={post!.text}
            user={post!.user}
            tags={post!.tags as TagData[]}
            count={post!.viewsCount}
          />
        ))
      ) : (
        <PostSkeleton />
      )}
    </Box>
  );
}
