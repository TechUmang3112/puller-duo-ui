// Imports
import { createSlice } from "@reduxjs/toolkit";

export type AdminState = {
  monthlyUsers: any[];
  yearlyUserSummary: any;
  monthlyComparision: any;
  users: any[];
  drivers: any[];
  riders: any[];
  count: { total: number; driver: number; rider: number; rides: number };
};

const initialState = {
  monthlyUsers: [],
  yearlyUserSummary: {},
  monthlyComparision: {},
  count: { total: 0, driver: 0, rider: 0, rides: 0 },
  users: [],
  drivers: [],
  riders: [],
} as AdminState;

export const adminReducer = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setMonthlyComparison: (state, action) => {
      state.monthlyComparision = action.payload;
    },
    setYearlySummary: (state, action) => {
      state.yearlyUserSummary = action.payload;
    },
    setMonthlyUsers: (state, action) => {
      state.monthlyUsers = action.payload;
    },
    setUserCount: (state, action) => {
      state.count = action.payload;
    },
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

export const {
  setUserCount,
  setMonthlyComparison,
  setUsers,
  setDrivers,
  setRiders,
  setMonthlyUsers,
  setYearlySummary,
} = adminReducer.actions;

export default adminReducer.reducer;
