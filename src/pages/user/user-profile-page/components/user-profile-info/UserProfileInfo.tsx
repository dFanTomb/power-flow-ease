import { Paper, Stack, Typography } from '@mui/material';
import { Email, Home, Link, Work } from '@mui/icons-material';

import { User } from '../../../../../types/user/userTypes';

export const UserProfileInfo = ({ user }: { user?: User }) => {
  const safeUser = {
    about: 'No information available',
    company: {},
    address: {},
    website: '',
    email: '',
    ...user,
  };

  return (
    <Paper>
      <Stack padding={2} spacing={2}>
        <Stack spacing={2}>
          <Typography fontWeight={'fontWeightBold'}>About</Typography>
          <Typography variant={'body2'}>{safeUser.about}</Typography>
        </Stack>

        <Stack spacing={2}>
          <Stack spacing={2} direction={'row'} alignItems={'center'}>
            <Work />
            <Typography variant={'body2'}>
              Working in: <strong>{safeUser.company?.name || 'Unknown'}</strong>
            </Typography>
          </Stack>

          <Stack spacing={2} direction={'row'} alignItems={'center'}>
            <Email />
            <Typography variant={'body2'}>
              <strong>{safeUser.email}</strong>
            </Typography>
          </Stack>

          <Stack spacing={2} direction={'row'} alignItems={'center'}>
            <Home />
            <Typography variant={'body2'}>
              Live in: <strong>{safeUser.address?.city || 'Unknown'}</strong>
            </Typography>
          </Stack>

          <Stack spacing={2} direction={'row'} alignItems={'center'}>
            <Link />
            <Typography variant={'body2'}>
              <strong>{safeUser.website}</strong>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};
