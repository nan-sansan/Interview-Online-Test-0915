import { Repo } from "@/repo/type";
import { User } from "@/types/User";

const key = "userRepoWithLocal";
const getData = () => {
  const originData = window.localStorage.getItem(key);
  try {
    const data = JSON.parse(originData || "[]") as User[];
    if (!Array.isArray(data)) {
      return [];
    } else {
      return data;
    }
  } catch {
    return [];
  }
};

const setData = (data: User[]) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

export const userRepoWithLocal: Repo<User> = {
  query: async (condition) => {
    let data = getData();
    const { equal, page, pageSize } = condition;
    const { id, name, email, gender, status } = equal ?? {};
    if (id) {
      data = data.filter((user) => {
        return user.id === id;
      });
    }
    if (name) {
      data = data.filter((user) => {
        return user.name === name;
      });
    }
    if (email) {
      data = data.filter((user) => {
        return user.email === email;
      });
    }
    if (gender) {
      data = data.filter((user) => {
        return user.gender === gender;
      });
    }
    if (status) {
      data = data.filter((user) => {
        return user.status === status;
      });
    }
    const total = data.length;
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    data = data.slice(startIndex, endIndex);

    return {
      content: data,
      total: total,
    };
  },
  create: async (user) => {
    const data = getData();
    if (data.some((u) => u.name === user.name || u.email === user.email)) {
      throw new Error("已存在的帳號或電子郵件");
    }
    const lastId = data.length > 0 ? data[data.length - 1].id : "0";
    const newId = String((Number(lastId) || 0) + 1);

    const clonedUser = { ...user, id: newId };
    setData([...data, clonedUser]);

    return clonedUser;
  },
  update: async (user) => {
    const data = getData();

    const index = data.findIndex((u) => u.id === user.id);
    if (index === -1) {
      throw new Error("使用者不存在");
    }
    data[index] = user;
    if (
      data.filter((u) => {
        return u.name === user.name;
      }).length > 1 ||
      data.filter((u) => {
        return u.email === user.email;
      }).length > 1
    ) {
      throw new Error("已存在的帳號或電子郵件");
    }
    setData(data);
    return user;
  },
  delete: async (user) => {
    const data = getData();
    const newData = data.filter(({ id }) => {
      return id !== user.id;
    });
    setData(newData);
    return;
  },
};
