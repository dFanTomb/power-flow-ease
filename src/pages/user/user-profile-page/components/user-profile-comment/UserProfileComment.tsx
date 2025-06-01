import { Paper, Stack, Typography } from '@mui/material';

import { Comment } from '../../../../../types/user/userPostsTypes';
import { UserAvatar } from '../../../../../components/user-avatar/UserAvatar';

interface Props {
  comment: Partial<Comment> & {
    author?: {
      image?: string;
      firstName?: string;
      lastName?: string;
    };
    created?: string;
    content?: string;
  };
}

export const UserProfileComment = ({ comment }: Props) => {
  const safeAuthor = {
    firstName: 'Unknown',
    lastName: 'User',
    image: undefined,
    ...comment.author,
  };

  return (
    <Stack direction={'row'} spacing={2}>
      <UserAvatar
        user={{
          image: safeAuthor.image,
          firstName: safeAuthor.firstName,
          lastName: safeAuthor.lastName,
        }}
      />
      <Stack component={Paper} sx={{ py: 1.5, px: 2 }} flex={1}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography fontSize={'14px'} fontWeight={'fontWeightMedium'}>
            {safeAuthor.firstName} {safeAuthor.lastName}
          </Typography>
          <Typography fontSize={'12px'}>{comment.created}</Typography>
        </Stack>
        <Typography fontSize={'14px'}>{comment.content}</Typography>
      </Stack>
    </Stack>
  );
};
