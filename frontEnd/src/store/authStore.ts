import { fetchUser, loginUser, logoutUser, refreshToken } from "@/api/authApi";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;

  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
  refresh: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const res = await loginUser(credentials);
          set({ token: res.accessToken, loading: false });
          await get().fetchCurrentUser();
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },

      logout: async () => {
        try {
          await logoutUser();
        } finally {
          set({ user: null, token: null });
        }
      },

      fetchCurrentUser: async () => {
        const token = get().token;
        if (!token) return;
        try {
          const res = await fetchUser(token);
          set({ user: res });
        } catch {
          set({ user: null });
        }
      },

      refresh: async () => {
        try {
          const res = await refreshToken();
          set({ token: res.accessToken });
        } catch {
          set({ token: null, user: null });
        }
      },
    }),
    { name: "auth-storage" }
  )
);
