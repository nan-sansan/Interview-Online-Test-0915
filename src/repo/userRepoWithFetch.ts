import { Repo } from "@/repo/type";
import { User } from "@/types/User";
import {
  addUserApi,
  deleteUsersApi,
  getUsersApi,
  updateUsersApi,
} from "@/apis/users";

export const userRepoWithFetch: Repo<User> = {
  query: async (condition) => {
    const { page, pageSize, equal } = condition;
    const query = { ...(equal ?? {}), page, size: pageSize };
    const res = await getUsersApi(query);
    return {
      content: res.users,
      total: res.total,
    };
  },
  create: async (user) => {
    const res = await addUserApi(user);
    return res.user;
  },
  update: async (user) => {
    const res = await updateUsersApi(user);
    return res.user;
  },
  delete: async (user) => {
    await deleteUsersApi(user.id);
  },
};
