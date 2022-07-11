// (c) Hussein Kamal
// Created in 2022

import { netflixActions } from "./netflix-slice";
import { uiActions } from "./ui-slice";

export const sendData = ({ data, type }) => {
  return async () => {
    const send = async () => {
      const response = await fetch(
        `https://netflix-56ef6-default-rtdb.firebaseio.com/${type}.json`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error!");
      }
    };

    try {
      send();
    } catch (err) {
      console.log(err.message);
    }
  };
};

const APIS = [
  "https://netflix-56ef6-default-rtdb.firebaseio.com/netflix.json",
  "https://netflix-56ef6-default-rtdb.firebaseio.com/list.json",
];

export const getData = () => {
  return async (dispatch) => {
    const get = async () => {
      dispatch(uiActions.setLoading(""));

      const promises = APIS.map((api) => fetch(api));

      const response = await Promise.all(promises);

      const data = await Promise.all(
        response.map((res) => {
          if (!res.ok) {
            throw new Error("Fetch Failed!");
          }

          return res.json();
        })
      );

      return data;
    };

    try {
      const receivedData = await get();
      dispatch(netflixActions.getData(receivedData[0]));
      dispatch(netflixActions.replaceList(receivedData[1] || []));

      dispatch(uiActions.setLoading("Success"));
    } catch (err) {
      dispatch(uiActions.removeLoading(err.message));
    }
  };
};
