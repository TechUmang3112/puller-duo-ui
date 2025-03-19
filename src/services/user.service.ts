export function checkProfileStatus() {
  const isProfileUpdated = localStorage.getItem("isProfileUpdated");
  if (!isProfileUpdated && window.location.pathname != "/user/profile") {
    window.location.replace("/user/profile");
  } else if (isProfileUpdated) {
    checkDocumentStatus();
  }
}

export function checkDocumentStatus() {
  return {};
  const isProfileUpdated = localStorage.getItem("isDocUnderVerification");
  if (
    isProfileUpdated &&
    window.location.pathname != "/user/verification-pending"
  ) {
    window.location.replace("/user/verification-pending");
  }
}
