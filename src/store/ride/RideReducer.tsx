// Imports
import { createSlice } from "@reduxjs/toolkit";
import { NumberLocale } from "yup/lib/locale";

export type RideState = {
  count: {
    total: number;
    upcoming: number;
    current: number;
    completed: number;
  };
};

const initialState = {
  count: { total: 0, upcoming: 0, current: 0, completed: 0 },
} as RideState;

export const rideReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const { setCount } = rideReducer.actions;

export default rideReducer.reducer;
