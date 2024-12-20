import { configureStore } from '@reduxjs/toolkit';

import { navigationReducer } from './sidebar/navigationSlice';
import { calendarReducer } from './calendar/calendarSlice';
import { formReducer } from './app/formSlice';
import { authReducer } from './app/authSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
    navigation: navigationReducer,
    calendar: calendarReducer,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
