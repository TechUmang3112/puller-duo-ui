// Imports
import { createSlice } from "@reduxjs/toolkit";

export type UserState = {
  name: string;
  email?: string;
  isAuthLoading: boolean;
  isDocVerificationPending: boolean;
  otpType: "Email" | "Forgot";
  type: "Admin" | "Not decided" | "Driver" | "Rider";
};

const initialState = {
  name: "User",
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
  setIsDocVerificationPending,
} = userReducer.actions;

export default userReducer.reducer;
