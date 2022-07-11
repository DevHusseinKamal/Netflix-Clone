// (c) Hussein Kamal
// Created in 2022

import { createSlice } from "@reduxjs/toolkit";

const netflixState = {
  netflixData: [],
  tvShows: [],
  movies: [],
  list: [],
  actionTypes: [],
  dramaTypes: [],
  romanceTypes: [],
  objectsDetails: Array(5).fill(null),
};

const netflixSlice = createSlice({
  name: "netflixData",
  initialState: netflixState,
  reducers: {
    getData(state, action) {
      state.netflixData = action.payload;
    },
    setFilteredData(state, action) {
      const filteredData = state.netflixData.filter(
        (item) => item.type === action.payload
      );

      if (action.payload === "series") {
        state.tvShows = filteredData;
      } else if (action.payload === "movie") {
        state.movies = filteredData;
      }
    },
    setUniqueObject(state, action) {
      const uniqueItem = state.netflixData.find(
        (item) => item.id === action.payload.id
      );
      state.objectsDetails[action.payload.index] = uniqueItem;
    },
    removeUniqueObject(state, action) {
      state.objectsDetails[action.payload] = null;
    },
    clearUniqueObject(state) {
      state.objectsDetails = Array(5).fill(null);
    },
    setDataTypes(state, action) {
      const filteredTypes = state.netflixData.filter(
        (item) => item.typeOfEmployment === action.payload
      );

      // state.actions.get(action.payload);

      if (action.payload === "action") {
        state.actionTypes.push(...filteredTypes);
      } else if (action.payload === "drama") {
        state.dramaTypes.push(...filteredTypes);
      } else if (action.payload === "romance") {
        state.romanceTypes.push(...filteredTypes);
      }
    },
    replaceList(state, action) {
      state.list = action.payload;
    },
    setListHandler(state, action) {
      const singleItem = state.netflixData.find(
        (item) => item.id === action.payload.id
      );
      singleItem.inList = true;
      state.objectsDetails[action.payload.index].inList = true;
      state.list.push(singleItem);
    },
    removeItemfromList(state, action) {
      const singleItem = state.netflixData.find(
        (item) => item.id === action.payload.id
      );
      singleItem.inList = false;
      state.objectsDetails[action.payload.index].inList = false;
      const restOfItems = state.list.filter(
        (item) => item.id !== action.payload.id
      );
      state.list = restOfItems;
    },
  },
});

export default netflixSlice;

export const netflixActions = netflixSlice.actions;
