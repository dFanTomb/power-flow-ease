import { useContext } from 'react';
import { IconButton, Stack } from '@mui/material';
import { LightModeRounded, DarkModeRounded } from '@mui/icons-material';

import { UserMenu } from '../user-menu/UserMenu';
import { useCurrentUser } from '../../../../hooks/api/use-current-user/useCurrentUser';
import { Notifications } from '../notifications/Notifications';
import { ColorModeContext } from '../../../../App';

export const ToolbarElements = () => {
  // const { data: user } = useCurrentUser();
  const user = useCurrentUser(); // Now returns User | null directly
  console.log('Current user:', user);

  const colorMode = useContext(ColorModeContext);

  if (!user) return null;

  return (
    <Stack direction={'row'} spacing={2} className='toolbar-elements'>
      <IconButton onClick={colorMode.toggleColorMode} color='inherit' sx={{ padding: '0' }}>
        {colorMode.mode === 'light' ? (
          <DarkModeRounded sx={{ height: '35px', width: '35px', padding: '3px', color: 'black' }} />
        ) : (
          <LightModeRounded sx={{ height: '35px', width: '35px', padding: '3px' }} />
        )}
      </IconButton>
      <Notifications />
      <UserMenu user={user} />
    </Stack>
  );
};
