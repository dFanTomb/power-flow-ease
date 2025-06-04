import { Stack } from '@mui/material';

import { UserProfilePost } from '../user-profile-post/UserProfilePost';
import { UserPost } from '../../../../../types/user/userPostsTypes';
import { User } from '../../../../../types/user/userTypes';

export const UserProfilePostsList = ({ posts, user }: { posts: UserPost[]; user: User }) => {
  // console.log(
  //   'Post IDs:',
  //   posts.map((post, index) => `${post.id}-${index}`),
  // );

  const postList = posts.map((post, index) => {
    return <UserProfilePost key={`${post.id}-${index}`} post={post} user={user} />;
  });

  return <Stack spacing={2}>{postList}</Stack>;
};
