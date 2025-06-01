import { Button, Paper, Stack, TextField } from '@mui/material';
import { Camera, EmojiEmotions, Image } from '@mui/icons-material';

import { UserAvatar } from '../../../../../components/user-avatar/UserAvatar';
import { User } from '../../../../../types/user/userTypes';

export const UserProfileNewComment = ({ user }: { user?: User }) => {
  const safeUser = {
    image: undefined,
    ...user,
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Stack spacing={2}>
        <Stack direction={'row'} spacing={2}>
          <UserAvatar user={safeUser} />
          <TextField fullWidth placeholder={'What is your new status?'} />
        </Stack>
        <Stack direction={'row'} alignItems={'flex-end'} color={'red'} justifyContent={'space-between'}>
          <Stack direction={'row'} spacing={2}>
            <Button size={'small'} startIcon={<Image />} variant={'outlined'}>
              Add image / video
            </Button>
            <Button startIcon={<Camera />} size={'small'} variant={'outlined'}>
              Streaming
            </Button>
            <Button startIcon={<EmojiEmotions />} size={'small'} variant={'outlined'}>
              Mood / activity
            </Button>
          </Stack>
          <div>
            <Button size={'small'} variant={'contained'} color={'primary'}>
              Publish
            </Button>
          </div>
        </Stack>
      </Stack>
    </Paper>
  );
};
