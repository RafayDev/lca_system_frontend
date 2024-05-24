import { configureStore } from '@reduxjs/toolkit';

import authReducer from './Features/authSlice';
import batchReducer from './Features/batchSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    batches: batchReducer,
  },
});