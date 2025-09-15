import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginApi } from "@/apis/auth";

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
        //TODO 可能需要實作登出的API
        set({ name: null });
      },
    }),
    { name: "auth-storage" },
  ),
);
