import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/User";

interface UserPoolStore {
  users: User[];
  register: (user: User) => boolean;
  getAllUser: () => User[];
  verifyUser: (loginName: string, loginEmail: string) => boolean;
  deleteUser: (userId: string) => void;
  updateUser: (userId: string, status: string) => void;
}

export const useUserPoolStore = create<UserPoolStore>()(
  persist(
    (set, get) => ({
      users: [],
      register: (newUser: User) => {
        const { users } = get();
        const user =
          users.find((user) => user.name === newUser.name) ||
          users.find((user) => user.email === newUser.email);
        if (user) {
          return false;
        } else {
          const lastId = Number(localStorage.getItem("lastId") || "0");
          const newId = (lastId + 1).toString();
          localStorage.setItem("lastId", newId);
          set({ users: [...users, { ...newUser, id: newId }] });
          return true;
        }
      },
      getAllUser: () => {
        const { users } = get();
        return users;
      },
      verifyUser: (loginName, loginEmail) => {
        const { users } = get();
        if (users.length === 0) {
          return false; //無使用者資料
        }
        //找到使用者名稱後驗證使用者輸入的email是否相同
        return users.some(
          (user) => user.name === loginName && user.email === loginEmail,
        );
      },
      deleteUser: (userId) => {
        const { users } = get();
        set({
          users: users.filter((user) => user.id !== userId),
        });
      },
      updateUser: (userId: string, status: string) => {
        const { users } = get();
        set({
          users: users.map((user) =>
            user.id === userId ? { ...user, status } : user,
          ),
        });
      },
    }),
    { name: "userPool-storage" },
  ),
);
