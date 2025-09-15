import { create } from "zustand";
import { persist } from "zustand/middleware";
import { userRepoWithLocal } from "@/repo/userRepoWithLocal";
import { userRepoWithFetch } from "@/repo/userRepoWithFetch";

interface RepoTypeState {
  type: "local" | "fetch";
  switchType: () => void;
}

export const useRepoTypeStore = create<RepoTypeState>()(
  persist(
    (set, get) => ({
      type: "local",
      switchType: () => {
        const { type } = get();
        if (type === "local") {
          set({ type: "fetch" });
        } else {
          set({ type: "local" });
        }
      },
    }),
    { name: "repo-storage" },
  ),
);
