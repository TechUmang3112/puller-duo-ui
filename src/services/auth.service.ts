// Imports
import { checkProfileStatus } from "./user.service";

export function validateAuth() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") == "true";
  console.log({ isLoggedIn });
  if (!isLoggedIn) {
    window.location.replace("/logIn");
  } else if (window.location.pathname != "/user/profile") {
    checkProfileStatus();
  }
}

export function successfulLogIn(userId: string) {
  localStorage.removeItem("isProfileUpdated");
  localStorage.removeItem("isDocUnderVerification");

  localStorage.setItem("userId", userId);
  localStorage.setItem("isLoggedIn", "true");
  window.location.replace("/");
}

export function logoutFromApp() {
  localStorage.clear();
  localStorage.setItem("isLoggedIn", "false");
  window.location.replace("/logIn");
}
