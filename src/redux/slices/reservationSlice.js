import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  getUserFromLocalStorage,
} from '../../helpers/LocalStorage';

export const BASE_URL = 'https://vespa-rentals.onrender.com/api/v1';

export const fetchVespa = createAsyncThunk(
  'vespas/fetchVespa',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/vespas/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(await err.response.data);
    }
  },
);

export const createReservation = createAsyncThunk(
  'vespas/createReservation',
  async (reservationData, { rejectWithValue }) => {
    try {
      const { token } = getUserFromLocalStorage().user;
      const response = await axios.post(
        `${BASE_URL}/reservations`,
        reservationData,
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(await err.response.data);
    }
  },
);

export const fetchReservations = createAsyncThunk(
  'vespas/fetchReservations',
  async (_, { rejectWithValue }) => {
    try {
      const { token } = getUserFromLocalStorage().user;
      const response = await axios.get(`${BASE_URL}/reservations`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(await err.response.data);
    }
  },
);

export const deleteReservation = createAsyncThunk(
  'vespas/deleteReservation',
  async (id, { rejectWithValue }) => {
    try {
      const { token } = getUserFromLocalStorage().user;
      const response = await axios.delete(`${BASE_URL}/reservations/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(await err.response.data);
    }
  },
);

const initialState = {
  vespas: [],
  singleVespa: {},
  reservations: [],
};
export const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    addReservation: (state, action) => {
      state.reservations.push(action.payload);
    },
    removeReservation: (state, action) => {
      // eslint-disable-next-line max-len
      const filteredReservations = state.reservations.filter((reservation) => reservation.id !== action.payload);
      state.reservations = filteredReservations;
    },
  },
  extraReducers: {
    [fetchVespa.fulfilled]: (state, action) => {
      state.singleVespa = action.payload;
    },

    [createReservation.fulfilled]: (state, action) => {
      state.reservations.push(action.payload);
    },
    [fetchReservations.fulfilled]: (state, action) => {
      state.reservations = action.payload;
    },
    [deleteReservation.fulfilled]: (state, action) => {
      const deleteReservationId = action.payload;
      // eslint-disable-next-line max-len
      state.reservations = state.reservations.filter((reservation) => reservation.id !== deleteReservationId);
    },
  },
});

export const { removeReservation, addReservation } = reservationSlice.actions;
export default reservationSlice.reducer;
