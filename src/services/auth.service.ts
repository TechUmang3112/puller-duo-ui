// Imports
import { checkProfileStatus } from "./user.service";

export function validateAuth() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    window.location.replace("/logIn");
  } else if (window.location.pathname != "/user/profile") {
    checkProfileStatus();
  }
}

export function successfulLogIn() {
  localStorage.removeItem("isProfileUpdated");
  localStorage.removeItem("isDocUnderVerification");

  localStorage.setItem("isLoggedIn", "true");
  window.location.replace("/");
}

export function logoutFromApp() {
  localStorage.setItem("isLoggedIn", "false");
  window.location.replace("/logIn");
}
