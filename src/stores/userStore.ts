import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginApi, logoutApi } from "@/apis/auth";

interface AuthState {
  name: string | null;
  login: (name: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      name: null,
      login: async (name, email) => {
        await loginApi(name, email);
        set({ name });
      },
      logout: async () => {
        await logoutApi();
        set({ name: null });
        window.location.href = "/";
      },
    }),
    { name: "auth-storage" },
  ),
);
