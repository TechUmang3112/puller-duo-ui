export function validateAuth() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") == "true";
  if (!isLoggedIn) {
    window.location.replace("/logIn");
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
