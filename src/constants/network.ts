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
  getRideCounts: baseUrl + "user/getRideCounts",
  upcomingRideList: baseUrl + "user/upcomingRideList",
  allRidesList: baseUrl + "user/allRidesList",
  changePassword: baseUrl + "user/changePassword",
  notifications: baseUrl + "user/notifications",
  currentRide: baseUrl + "user/currentRide",
  payments: baseUrl + "user/payments",
};

export const nDriver = {
  offerRide: baseUrl + "driver/offerRide",
  cancelRide: baseUrl + "driver/cancelRide",
  startRide: baseUrl + "driver/startRide",
};

export const nRider = {
  findRide: baseUrl + "rider/findRide",
  acceptRide: baseUrl + "rider/acceptRide",
  initiatePayment: baseUrl + "rider/initiatePayment",
  syncPayment: baseUrl + "rider/syncPayment",
  rateRide: baseUrl + "rider/rateRide",
};

export const nGoogle = {
  searchPlaces: baseUrl + "thirdParty/google/searchPlaces",
  measureDistance: baseUrl + "thirdParty/google/measureDistance",
};

export const nAdmin = {
  users: baseUrl + "admin/users",
  drivers: baseUrl + "admin/drivers",
  riders: baseUrl + "admin/riders",
  updateUserStatus: baseUrl + "admin/updateUserStatus",
  approvalList: baseUrl + "admin/pendingApprovals",
  updateDocStatus: baseUrl + "admin/updateDocStatus",
  totalRides: baseUrl + "admin/totalRides",
  monthlyUsers: baseUrl + "admin/monthlyUsers",
  yearlyUsers: baseUrl + "admin/yearlyUsers",
  monthlyComparision: baseUrl + "admin/monthlyComparison",
  userIngiths: baseUrl + "admin/userInsights",
};
