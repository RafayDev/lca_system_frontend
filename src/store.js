import { configureStore } from '@reduxjs/toolkit';

import authReducer from './Features/authSlice';
import userReducer from './Features/userSlice';
import batchReducer from './Features/batchSlice';
import courseReducer from './Features/courseSlice';
import teacherReducer from './Features/teacherSlice';
import roleReducer from './Features/roleSlice';
import permissionReducer from './Features/permissionSlice';
import studentReducer from './Features/studentSlice';
import timetableReducer from './Features/timetableSlice';
import seminarReducer from './Features/seminarSlice';
import seminarAttendeeReducer from './Features/seminarAttendeeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    batches: batchReducer,
    courses: courseReducer,
    teachers: teacherReducer,
    roles: roleReducer,
    permissions: permissionReducer,
    students: studentReducer,
    timetable: timetableReducer,
    seminars: seminarReducer,
    seminarAttendees: seminarAttendeeReducer,
  },
});