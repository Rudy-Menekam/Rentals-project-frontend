import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  getUserFromLocalStorage,
} from '../../helpers/LocalStorage';

export const BASE_URL = 'http://localhost:3000/api/v1/';

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
      const token = getUserFromLocalStorage();
      const response = await axios.post(
        `${BASE_URL}/reservations`,
        reservationData,
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        },
      );
      return response.data;
    } catch (err) {
      console.error(err);
      return rejectWithValue(await err.response.data);
    }
  },
);

export const fetchReservations = createAsyncThunk(
  'vespas/fetchReservations',
  async (_, { rejectWithValue }) => {
    try {
      const token = getUserFromLocalStorage();
      const response = await axios.get(`${BASE_URL}/reservations`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
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
  async (id, { rejectWithValue, getState }) => {
    try {
      const token = getUserFromLocalStorage();
      await axios.delete(`${BASE_URL}/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      const state = getState();
      const filteredReservations = state.vespas.reservations.filter(
        (reservation) => reservation.id !== id,
      );
      return filteredReservations;
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
  name: 'vespas',
  initialState,
  reducers: {
    addReservation: (state, action) => {
      state.reservations.push(action.payload);
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
      state.reservations = action.payload;
    },
  },
});

export const { addReservation } = reservationSlice.actions;
export default reservationSlice.reducer;
