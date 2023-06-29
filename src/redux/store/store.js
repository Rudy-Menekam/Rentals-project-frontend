/* eslint-disable */
import { configureStore } from '@reduxjs/toolkit';
import vespaSlice from '../slices/vespaSlice';
import userSlice from '../slices/userSlice';
import reservationSlice from '../slices/reservationSlice';

const store = configureStore({
  reducer: {
    vespas: vespaSlice,
    user: userSlice,
    reservations: reservationSlice,
  },
});

export default store;
