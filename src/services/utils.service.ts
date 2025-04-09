// Imports
import { toast } from "react-toastify";

export function showError(errorMsg: String) {
  toast.error(errorMsg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

export function showSuccess(msg: String) {
  toast.success(msg, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

export function delayInMillis(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
