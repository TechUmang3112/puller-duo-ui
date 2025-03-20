// Imports
import { createSlice } from "@reduxjs/toolkit";

export type UserState = {
  type: "Admin" | "Not decided" | "Driver" | "Rider";
};

const initialState = {
  type: "Not decided",
} as UserState;

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: () => initialState,
    setType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { setType } = userReducer.actions;

export default userReducer.reducer;
