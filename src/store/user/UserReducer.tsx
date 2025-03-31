// Imports
import { createSlice } from "@reduxjs/toolkit";

export type UserState = {
  gender?: string;
  name: string;
  dob?: string;
  email?: string;
  isAuthLoading: boolean;
  isDocVerificationPending: boolean;
  otpType: "Email" | "Forgot";
  type: "Admin" | "Not decided" | "Driver" | "Rider";
};

const initialState = {
  gender: undefined,
  name: "User",
  dob: undefined,
  email: undefined,
  isAuthLoading: false,
  otpType: "Email",
  type: "Not decided",
  isDocVerificationPending: false,
} as UserState;

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setDob: (state, action) => {
      state.dob = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setIsAuthLoading: (state, action) => {
      state.isAuthLoading = action.payload;
    },
    setOtpType: (state, action) => {
      state.otpType = action.payload;
    },
    setIsDocVerificationPending: (state, action) => {
      state.isDocVerificationPending = action.payload;
    },
    logOut: () => initialState,
    setType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const {
  setName,
  setEmail,
  setIsAuthLoading,
  setOtpType,
  setType,
  setDob,
  setIsDocVerificationPending,
  setGender,
} = userReducer.actions;

export default userReducer.reducer;
