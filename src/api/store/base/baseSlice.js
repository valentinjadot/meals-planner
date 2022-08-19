/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { postMessage } from "../../../api/postMessage";

const initialState = {
  participants: [],
  error: "",
  loading: false,
};

const postMessage = createAsyncThunk(
  "postMessage",
  async (payload, _thunkAPI) => {
    const response = await postMessage(payload);
    return response;
  }
);

const baseSlice = createSlice({
  name: "base",
  initialState,
  reducers: {
    setParticipants: (state, action) => {
      state.participants = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: {
    [postMessage.fulfilled]: (state, action) => {
      console.log("MENSAJE ENVIADO CON EXITO");
      state.error = false;
      state.loading = false;
    },
    [postMessage.rejected]: (state) => {
      console.log("MENSAJE FALLÓ, NO FUE ENVIADO");
      state.publicationsList = [];
      state.loading = false;
      state.error = true;
    },
    [postMessage.pending]: (state) => {
      console.log("ENVIO DE MENSAJE PENDIENTE");
      state.error = false;
      state.loading = true;
    },
  },
});

export const { setPublicationsList, setLoading, setError } = baseSlice.actions;
export const fetchPublicationsThunk = fetchPublications;
export const createPublicationsThunk = createPublications;
export const createImageThunk = createImage;
export const baseReducer = baseSlice.reducer;
