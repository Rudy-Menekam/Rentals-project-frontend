import { configureStore } from '@reduxjs/toolkit';
import vespaSlice from '../slices/vespaSlice';
import userSlice from '../slices/userSlice';

const store = configureStore({
  reducer: {
    vespas: vespaSlice,
    user: userSlice,
  },
});

export default store;
