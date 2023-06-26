/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { upload } from '@testing-library/user-event/dist/upload';
import { getUserFromLocalStorage } from '../../utils/LocalStorage';

export const BASE_URL = 'http://127.0.0.1:3000/api/v1';

export const fetchVespas = createAsyncThunk(
  'vespas/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/vespas`);
      return response.data;
    } catch (err) {
      return rejectWithValue(await err.response.data);
    }
  },
);

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

export const deleteVespa = createAsyncThunk(
  'vespas/deleteVespa',
  async (id, { rejectWithValue }) => {
    try {
      const token = getUserFromLocalStorage();
      const response = await axios.delete(`${BASE_URL}/vespas/${id}`, {
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

export const createNewVespa = createAsyncThunk(
  'vespas/createNewVespa',
  async (vespaData, { rejectWithValue }) => {
    try {
      const token = getUserFromLocalStorage();
      const response = await axios.post(`${BASE_URL}/vespas`, vespaData, {
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
      const response = await axios.delete(`${BASE_URL}/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      const state = getState();
      const filteredReservations = state.vespas.reservations.filter(
        (reservation) => reservation.id != id,
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

export const vespaSlice = createSlice({
  name: 'vespas',
  initialState,
  reducers: {
    addVespa: (state, action) => {
      state.vespas.push(action.payload);
    },
    removeVespa: (state, action) => {
      const filteredVespas = state.vespas.filter((vespa) => vespa.id != action.payload);
      state.vespas = filteredVespas;
    },
    addReservation: (state, action) => {
      state.reservations.push(action.payload);
    },
  },
  extraReducers: {
    [fetchVespas.fulfilled]: (state, action) => {
      state.vespas = action.payload;
    },
    [fetchVespa.fulfilled]: (state, action) => {
      state.singleVespa = action.payload;
    },
    [deleteVespa.fulfilled]: (state, action) => {
      const deletedVespaId = action.payload;
      state.vespas = state.vespas.filter((vespa) => vespa.id !== deletedVespaId);
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

export const { removeVespa, addVespa, addReservation } = vespaSlice.actions;

export default vespaSlice.reducer;
