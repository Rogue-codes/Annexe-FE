/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/user.interface";
import Cookies from "js-cookie";

export interface IInitialState {
  user: IUser | null;
  isAuthenticated: boolean;
}

const token = Cookies.get("abacus-token");

const user = localStorage.getItem("annexe-user");

const initialState: IInitialState = {
  user: user ? JSON.parse(user!) : undefined,
  isAuthenticated: token ? true : false,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (
      state,
      action: PayloadAction<{
        user: IUser;
        access_token: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload.access_token;

      Cookies.set("annexe-token", action.payload.access_token, {
        expires: 5 / (24 * 60),
      });
      localStorage.setItem("annexe-user", JSON.stringify(state.user));
    },
    updateUser: (
      state,
      action: PayloadAction<{
        user: IUser;
      }>
    ) => {
      state.user = action.payload.user;

      localStorage.setItem("annexe-user", JSON.stringify(state.user));
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;

      // Remove token from cookies
      Cookies.remove("annexe-token");
      // Remove user from localStorage
      localStorage.removeItem("annexe-user");
    },
  },
});

export const { loginUser, logoutUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
