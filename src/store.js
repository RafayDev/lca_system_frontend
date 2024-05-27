import { configureStore } from '@reduxjs/toolkit';

import authReducer from './Features/authSlice';
import userReducer from './Features/userSlice';
import batchReducer from './Features/batchSlice';
import courseReducer from './Features/courseSlice';
import teacherReducer from './Features/teacherSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    batches: batchReducer,
    courses: courseReducer,
    teachers: teacherReducer,
  },
});