import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserFromLocalStorage } from '../../helpers/LocalStorage';

export const BASE_URL = 'http://127.0.0.1:3000/api/v1';

export const fetchVespas = createAsyncThunk(
  'vespas/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const { token } = getUserFromLocalStorage().user;
      const response = await axios.get(`${BASE_URL}/vespas`, {
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

export const fetchVespa = createAsyncThunk(
  'vespas/fetchVespa',
  async (id, { rejectWithValue }) => {
    try {
      const { token } = getUserFromLocalStorage().user;
      const response = await axios.get(`${BASE_URL}/vespas/${id}`, {
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

export const deleteVespa = createAsyncThunk(
  'vespas/deleteVespa',
  async (id, { rejectWithValue }) => {
    try {
      const { token } = getUserFromLocalStorage().user;
      const response = await axios.delete(`${BASE_URL}/vespas/${id}`, {
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

export const createNewVespa = createAsyncThunk(
  'vespas/createNewVespa',
  async (vespaData, { rejectWithValue }) => {
    try {
      const { token } = getUserFromLocalStorage().user;
      const response = await axios.post(`${BASE_URL}/vespas`, vespaData, {
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
};

export const vespaSlice = createSlice({
  name: 'vespas',
  initialState,
  reducers: {
    addVespa: (state, action) => {
      state.vespas.push(action.payload);
    },
    removeVespa: (state, action) => {
      const filteredVespas = state.vespas.filter((vespa) => vespa.id !== action.payload);
      state.vespas = filteredVespas;
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
  },
});

export const { removeVespa, addVespa } = vespaSlice.actions;

export default vespaSlice.reducer;
