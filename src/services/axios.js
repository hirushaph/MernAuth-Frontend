import axios from "axios";
import useRefreshToken from "../hooks/useRefreshToken";

const BASE_URL = "http://localhost:3000/api/v1";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor
axiosPrivate.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");
    if (!user) return config;
    const { token } = JSON.parse(user);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refresh = useRefreshToken();

    // If the error status is 403 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refresh();
        const user = localStorage.getItem("user");
        if (!user) return;
        const { token } = JSON.parse(user);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle errors
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export { axiosPrivate };
