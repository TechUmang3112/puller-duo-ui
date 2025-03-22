// Imports
import axios from "axios";
import { toast } from "react-toastify";

export async function get(url: string, params = {}): Promise<any> {
  try {
    const response = await axios.get(url, { params });
    const apiResponse = response.data;
    return apiResponse;
  } catch (error: any) {
    const errorData = error?.response?.data ?? {};
    const errorMsg = errorData?.message ?? errorData?.error ?? "";
    if (errorMsg) {
      // Show error message in a snackbar
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
    return { isError: true };
  }
}

export async function post(url: string, body = {}, headers = {}): Promise<any> {
  try {
    const response = await axios.post(url, body, { headers });
    const apiResponse = response.data;
    return apiResponse;
  } catch (error: any) {
    const errorData = error?.response?.data ?? {};
    const errorMsg = errorData?.message ?? errorData?.error ?? "";
    if (errorMsg) {
      // Show error message in a snackbar
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
    return { isError: true };
  }
}
