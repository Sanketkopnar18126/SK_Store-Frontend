import axios from "axios";
import { getStore } from "../../Store/storeAccessor";
import { refreshToken, logoutUser } from "../../Store/Slices/AuthSlice";

const axiosClient = axios.create({
  baseURL: "https://localhost:7126/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

let refreshPromise: Promise<any> | null = null;

/* ---------------- REQUEST ---------------- */
axiosClient.interceptors.request.use(
  (config) => {
    const store = getStore();
    const token = store.getState().auth.accessToken;

    if (token && !config.url?.includes("/Auth")) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ---------------- RESPONSE ---------------- */
axiosClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const store = getStore();
    const originalRequest = error.config;

    if (originalRequest?.url?.includes("/Auth/refresh")) {
      store.dispatch(logoutUser());
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = store.dispatch(refreshToken()).unwrap();
        }

        await refreshPromise;
        refreshPromise = null;

        const newToken = store.getState().auth.accessToken;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return axiosClient(originalRequest);
      } catch (err) {
        refreshPromise = null;
        store.dispatch(logoutUser());
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
