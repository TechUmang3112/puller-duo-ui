// Imports
import { Env } from "./env";

const baseUrl = Env.network.baseUrl;

export const nAuth = {
  signUp: baseUrl + "auth/signUp",
  validateEmailOTp: baseUrl + "auth/validateOTP",
  logIn: baseUrl + "auth/login",
  forgotPassword: baseUrl + "auth/forgotpassword",
  validateForgotPassword: baseUrl + "auth/validateOTPForForgetPassword",
};

export const nUser = {
  profile: baseUrl + "user/profile",
  updateProfile: baseUrl + "user/updateProfile",
};
