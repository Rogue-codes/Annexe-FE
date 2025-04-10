
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/user.interface";

export interface IInitialState {
  user: IUser
  isAuthenticated: boolean
}

const user = localStorage.getItem("user");

const initialState: IInitialState = {
  user: user ? JSON.parse(user!) : undefined,
  isAuthenticated: !!user,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (
      state,
      action: PayloadAction<IUser>
    ) => {
      state.user = action.payload;

      localStorage.setItem("user-tutor", JSON.stringify(state.user));
    },
  },
});

export const { loginUser } = userSlice.actions;

export default userSlice.reducer;