import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  isAuthenticated: localStorage.getItem('user') ? true : false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = { ...action.payload, password: '' };
      localStorage.setItem('user', JSON.stringify(state.user));
    },

    register: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('user');
    },

    setUserFromLocalStorage: (state) => {
      const user = localStorage.getItem('user');
      if (user) {
        state.isAuthenticated = true;
        state.user = JSON.parse(user);
      }
    },
  },
});

export const { login, register, logout, setUserFromLocalStorage } = authSlice.actions;
export const { reducer: authReducer } = authSlice;
