// Imports
import { createSlice } from "@reduxjs/toolkit";

export type AdminState = {
  users: any[];
  drivers: any[];
  riders: any[];
};

const initialState = {
  users: [],
  drivers: [],
  riders: [],
} as AdminState;

export const adminReducer = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setDrivers: (state, action) => {
      state.drivers = action.payload;
    },
    setRiders: (state, action) => {
      state.riders = action.payload;
    },
  },
});

export const { setUsers, setDrivers, setRiders } = adminReducer.actions;

export default adminReducer.reducer;
