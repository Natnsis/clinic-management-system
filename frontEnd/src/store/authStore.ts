import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// ---------- Types ----------
type UserData = {
  email: string;
  password: string;
};

type TokenPayload = {
  userId: string;
  role: string;
  exp: number; // expiry (seconds since epoch)
  iat: number; // issued at
};

type AuthStore = {
  token: string | null;
  user: TokenPayload | null;
  login: (userData: UserData) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
  isTokenExpired: () => boolean;
};

// ---------- Axios Instance ----------
const api = axios.create({
  baseURL: "http://localhost:4000/auth",
  withCredentials: true,
});

// ---------- Zustand Store ----------
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,

      login: async (userData: UserData) => {
        const res = await api.post("/login", userData);
        const token = res.data.accessToken;
        const user = jwtDecode<TokenPayload>(token);
        set({ token, user });
      },

      logout: () => {
        set({ token: null, user: null });
      },

      refresh: async () => {
        try {
          const res = await api.post("/refresh");
          const token = res.data.accessToken;
          const user = jwtDecode<TokenPayload>(token);
          set({ token, user });
        } catch (err) {
          console.error("Refresh failed:", err);
          set({ token: null, user: null });
        }
      },

      isTokenExpired: () => {
        const { user } = get();
        if (!user?.exp) return true;
        return Date.now() >= user.exp * 1000;
      },
    }),
    { name: "auth-storage" }
  )
);

// ---------- Axios Interceptors ----------

// Attach token to every request
api.interceptors.request.use((config) => {
  const { token, isTokenExpired, refresh } = useAuthStore.getState();

  if (token) {
    // refresh proactively if expired
    if (isTokenExpired()) {
      refresh();
    }
    config.headers.Authorization = `Bearer ${useAuthStore.getState().token}`;
  }
  return config;
});

// Retry request if 401 (token expired)
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { refresh, token } = useAuthStore.getState();
      await refresh();

      const newToken = useAuthStore.getState().token;
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
