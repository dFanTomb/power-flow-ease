import { useAppSelector } from '../../../store/hooks';
import { User } from '../../../types/user/userTypes';

import mockAvatar from '../../../mocks/users/assets/avatar.png';
import mockCover from '../../../mocks/users/assets/cover.png';

export const useCurrentUser = (): User | null => {
  const user = useAppSelector((state) => state.auth.currentUser);

  if (!user) return null;

  return {
    age: 0,
    phone: '',
    company: '',
    birthDate: '',
    about: '',
    address: '',
    website: '',
    role: '',
    status: '',
    lastLogin: new Date().toISOString(),
    ...user,
    image: user.image || mockAvatar,
    profileBackground: user.profileBackground || mockCover,
  };
};
