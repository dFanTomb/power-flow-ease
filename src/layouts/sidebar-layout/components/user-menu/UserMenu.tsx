import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

import {
  UserMenuContainer,
  UserMenuIconButton,
  UserMenuInfo,
  UserMenuMenu,
  UserMenuMenuItem,
  UserMenuMenuItemWithSeparator,
} from './styled';

import { routes } from '../../../../contants/routes';
import { User } from '../../../../types/user/userTypes';
import { useAppDispatch } from '../../../../store/hooks';
import { UserAvatar } from '../../../../components/user-avatar/UserAvatar';
import { logout } from '../../../../store/app/authSlice';

export const UserMenu = ({ user }: { user: User }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClose = () => setAnchorEl(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate(routes.login);
  };

  return (
    <UserMenuContainer>
      <UserMenuIconButton sx={{ padding: 0 }} onClick={handleClick}>
        <UserAvatar src={user.image} />
      </UserMenuIconButton>
      <UserMenuMenu
        id='user-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <UserMenuInfo>
          <Typography fontSize={14} color={'text.secondary'}>
            {user.email}
          </Typography>
        </UserMenuInfo>
        <UserMenuMenuItem onClick={handleClose}>Profile</UserMenuMenuItem>
        <UserMenuMenuItem onClick={handleClose}>My account</UserMenuMenuItem>
        <UserMenuMenuItemWithSeparator onClick={handleLogout}>Logout</UserMenuMenuItemWithSeparator>
      </UserMenuMenu>
    </UserMenuContainer>
  );
};
