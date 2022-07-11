// (c) Hussein Kamal
// Created in 2022

import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isLoading: true,
    message: "",
    authMessage: "",
  },
  reducers: {
    setLoading(state, action) {
      state.message = action.payload;
    },
    removeLoading(state, action) {
      state.isLoading = false;
      state.message = action.payload;
    },
    showAuthFailed(state, action) {
      state.authMessage = action.payload;
    },
    resetMessage(state) {
      state.authMessage = "";
    },
  },
});

export default uiSlice;

export const uiActions = uiSlice.actions;
