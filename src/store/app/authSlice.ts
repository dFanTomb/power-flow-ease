import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mockAvatar from '../../mocks/users/assets/avatar.png';
import mockCover from '../../mocks/users/assets/cover.png';
import { User } from '../../types/user/userTypes';

type AuthState = {
  currentUser: User | null;
  isAuthenticated: boolean;
  users: User[]; // Store all registered users
};

const getInitialUsers = (): User[] => {
  const storedUsers = localStorage.getItem('users');
  return storedUsers ? JSON.parse(storedUsers) : [];
};

const initialState: AuthState = {
  currentUser: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!) : null,
  isAuthenticated: localStorage.getItem('currentUser') ? true : false,
  users: getInitialUsers(),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const { email, password } = action.payload;
      const user = state.users.find((u) => u.email === email && u.password === password);

      if (user) {
        state.currentUser = { ...user, password: '' }; // Don't store password in state
        state.isAuthenticated = true;
        localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      }
    },

    register: (state, action: PayloadAction<Omit<User, 'id'>>) => {
      const newUser = {
        ...action.payload,
        id: Date.now(),
        // default values for new properties
        age: action.payload.age || 0,
        phone: action.payload.phone || '',
        company: action.payload.company || '',
        birthDate: action.payload.birthDate || '',
        about: action.payload.about || '',
        address: action.payload.address || '',
        website: action.payload.website || '',
        role: action.payload.role || 'user',
        status: action.payload.status || 'active',
        lastLogin: new Date().toISOString(),
        image: action.payload.image || mockAvatar,
        profileBackground: action.payload.profileBackground || mockCover,
      };

      state.users.push(newUser);
      state.currentUser = { ...newUser, password: '' };
      state.isAuthenticated = true;

      localStorage.setItem('users', JSON.stringify(state.users));
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      localStorage.removeItem('currentUser');
    },

    setUserFromLocalStorage: (state) => {
      const user = localStorage.getItem('currentUser');
      if (user) {
        state.currentUser = JSON.parse(user);
        state.isAuthenticated = true;
      }
    },
  },
});

export const { login, register, logout, setUserFromLocalStorage } = authSlice.actions;
export const { reducer: authReducer } = authSlice;
