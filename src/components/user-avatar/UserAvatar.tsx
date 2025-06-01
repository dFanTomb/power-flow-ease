import { Avatar, AvatarProps } from '@mui/material';

interface UserAvatarProps extends AvatarProps {
  user?: {
    image?: string;
    firstName?: string;
    lastName?: string;
  };
}

export const UserAvatar = ({ user, ...props }: UserAvatarProps) => {
  const initials = [user?.firstName?.[0], user?.lastName?.[0]].filter(Boolean).join('');

  const altText =
    user?.firstName || user?.lastName ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'User avatar';

  return (
    <Avatar
      src={user?.image}
      alt={altText}
      {...props}
      sx={{
        boxShadow: 3,
        borderRadius: '50%',
        overflow: 'hidden',
        backgroundColor: user?.image ? undefined : 'action.selected',
        color: user?.image ? undefined : 'text.primary',
        ...props.sx,
      }}
    >
      {!user?.image && initials}
    </Avatar>
  );
};
