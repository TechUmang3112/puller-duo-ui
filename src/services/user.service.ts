export function checkProfileStatus() {
  const isProfileUpdated = localStorage.getItem("isProfileUpdated");
  if (
    !isProfileUpdated &&
    window.location.pathname != "/user/profile" &&
    localStorage.getItem("user_type") != "2"
  ) {
    window.location.replace("/user/profile");
  }
}
