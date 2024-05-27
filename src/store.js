import { configureStore } from '@reduxjs/toolkit';

import authReducer from './Features/authSlice';
import batchReducer from './Features/batchSlice';
import courseReducer from './Features/courseSlice';
import teacherReducer from './Features/teacherSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    batches: batchReducer,
    courses: courseReducer,
    teachers: teacherReducer,
  },
});