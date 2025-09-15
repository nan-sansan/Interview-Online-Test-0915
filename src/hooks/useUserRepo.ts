import { useRepoTypeStore } from "@/stores/useRepoTypeStore";
import { userRepoWithLocal } from "@/repo/userRepoWithLocal";
import { userRepoWithFetch } from "@/repo/userRepoWithFetch";

export const useUserRepo = () => {
  const { type } = useRepoTypeStore();
  if (type === "local") {
    return userRepoWithLocal;
  } else {
    return userRepoWithFetch;
  }
};
