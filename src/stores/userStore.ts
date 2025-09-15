import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  name: string | null;
  login: (name: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      name: null,
      login: (name) => {
        set({ name: name });
      },
      logout: () => set({ name: null }),
    }),
    { name: "auth-storage" },
  ),
);
