import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/AuthSlice';
import liveReducer from './slice/LiveSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    live: liveReducer,
  },
});
