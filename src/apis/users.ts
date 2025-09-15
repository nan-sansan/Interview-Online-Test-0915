import apiClient from "@/apis/config/apiClient";
import { User } from "@/types/User";

export const getUsersApi = async (
  query: Partial<User> & { page?: number; size?: number },
) => {
  const res = await apiClient({
    method: "GET",
    url: "/api/users",
    params: query,
  });
  return res.data as { users: User[]; total: number };
};

export const updateUsersApi = async (user: User) => {
  const res = await apiClient({
    method: "PUT",
    url: "/api/users/" + user.id,
    data: user,
  });
  return res.data as { user: User; message: string };
};

export const deleteUsersApi = async (id: string) => {
  await apiClient({
    method: "DELETE",
    url: "/api/users/" + id,
  });
};

export const addUserApi = async (user: User) => {
  const res = await apiClient({
    method: "POST",
    url: "/api/users",
    data: user,
  });
  return res.data as { user: User; message: string };
};
