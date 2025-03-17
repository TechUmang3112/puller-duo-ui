export function validateAuth() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    window.location.replace("/logIn");
  }
}

export function successfulLogIn() {
  localStorage.setItem("isLoggedIn", "true");
  window.location.replace("/");
}

export function logoutFromApp() {
  localStorage.setItem("isLoggedIn", "false");
  window.location.replace("/logIn");
}
