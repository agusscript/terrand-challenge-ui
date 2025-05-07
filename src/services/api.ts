import axios from "axios";
import toast from "react-hot-toast";
import { AuthService } from "./authService";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const message =
      error.response?.data?.message || "Ocurrió un error. Por favor intenta nuevamente.";

    if (error.response?.status === 401) {
      AuthService.clearAuth();
      window.location.href = "/login";
    }

    toast.error(message);
    return Promise.reject(error);
  },
);
