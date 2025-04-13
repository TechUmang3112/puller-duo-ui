// Imports
import { createSlice } from "@reduxjs/toolkit";

export type RideState = {
  isSearchedForRide: boolean;
  count: {
    total: number;
    upcoming: number;
    current: number;
    completed: number;
  };
  availableRides: any[];
};

const initialState = {
  isSearchedForRide: false,
  availableRides: [],
  count: { total: 0, upcoming: 0, current: 0, completed: 0 },
} as RideState;

export const rideReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload;
    },
    setAvailableRides: (state, action) => {
      state.availableRides = action.payload;
    },
    setIsSearchedForRide: (state, action) => {
      state.isSearchedForRide = action.payload;
    },
  },
});

export const { setCount, setAvailableRides, setIsSearchedForRide } =
  rideReducer.actions;

export default rideReducer.reducer;
