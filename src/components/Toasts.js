import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Small wrapper helpers to keep usage consistent across the app
export const showSuccess = (message, opts = {}) => {
  toast.success(message, {
    position: "top-left",
    // autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...opts,
  });
};

export const showError = (message, opts = {}) => {
  toast.error(message, {
    position: "top-left",
    // autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...opts,
  });
};
