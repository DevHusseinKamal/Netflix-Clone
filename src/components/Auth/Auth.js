// (c) Hussein Kamal
// Created in 2022

import { authActions } from "../store/auth-slice";
import { uiActions } from "../store/ui-slice";

export const signUp = (data) => {
  return async (dispatch) => {
    const signUpUser = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAjCnXFWA_Vhj7OoRwDDmC5Xg0kGE2Srwg",
        {
          method: "POST",
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        let errorMessage = "Authentication failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
          throw new Error(errorMessage);
        }
      }
      const receivedData = await response.json();
      return receivedData;
    };
    try {
      const user = await signUpUser();
      dispatch(authActions.loginHandler(user.email));
    } catch (err) {
      dispatch(uiActions.showAuthFailed(err.message));
    }
  };
};

export const login = (data) => {
  return async (dispatch) => {
    const loginUser = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAjCnXFWA_Vhj7OoRwDDmC5Xg0kGE2Srwg",
        {
          method: "POST",
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error.message ||
            "We can't find your membership, please check your email or password"
        );
      }
      const fallbackData = await response.json();

      return fallbackData;
    };
    try {
      const user = await loginUser();
      dispatch(authActions.loginHandler(user.email));
    } catch (err) {
      dispatch(uiActions.showAuthFailed(err.message));
    }
  };
};
