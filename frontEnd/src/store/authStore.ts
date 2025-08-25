import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

type UserData = {
  email: string;
  password: string;
};

type AuthStore = {
  token: string | null;
  login: (userData: UserData) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
};

// axios instance
const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,

      login: async (userData: UserData) => {
        const res = await api.post("/login", userData);
        set({ token: res.data.accessToken });
      },

      logout: () => {
        set({ token: null });
      },

      refresh: async () => {
        try {
          const res = await api.post("/refresh");
          set({ token: res.data.accessToken });
        } catch (err) {
          console.error("Refresh failed:", err);
          set({ token: null });
        }
      },
    }),
    { name: "auth-storage" }
  )
);

// Axios Interceptor (auto refresh when 401)
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // if 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = useAuthStore.getState().refresh;
      await refresh(); // call refresh
      const newToken = useAuthStore.getState().token;
      if (newToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest); // retry request
      }
    }

    return Promise.reject(error);
  }
);

// attach token automatically
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
