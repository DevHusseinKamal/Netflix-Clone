// (c) Hussein Kamal
// Created in 2022

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import netflixSlice from "./netflix-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    netflix: netflixSlice.reducer,
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
