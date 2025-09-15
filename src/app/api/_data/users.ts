import { User } from "@/types/User";
import { DataPool } from "@/types/DataPool";

const deepCopy = (data: User[]) => {
  return JSON.parse(JSON.stringify(data));
};

const _data: User[] = [
  { id: "1", name: "NN", email: "123123", gender: "F", status: "active" },
  { id: "2", name: "WW", email: "aaaaaa", gender: "M", status: "active" },
  {
    id: "3",
    name: "AA",
    email: "aa@example.com",
    gender: "F",
    status: "inactive",
  },
  {
    id: "4",
    name: "BB",
    email: "bb@example.com",
    gender: "M",
    status: "active",
  },
  {
    id: "5",
    name: "CC",
    email: "cc@example.com",
    gender: "O",
    status: "active",
  },
  {
    id: "6",
    name: "DD",
    email: "dd@example.com",
    gender: "F",
    status: "inactive",
  },
  {
    id: "7",
    name: "EE",
    email: "ee@example.com",
    gender: "M",
    status: "active",
  },
  {
    id: "8",
    name: "FF",
    email: "ff@example.com",
    gender: "F",
    status: "active",
  },
  {
    id: "9",
    name: "GG",
    email: "gg@example.com",
    gender: "M",
    status: "inactive",
  },
  {
    id: "10",
    name: "HH",
    email: "hh@example.com",
    gender: "O",
    status: "active",
  },
  {
    id: "11",
    name: "II",
    email: "ii@example.com",
    gender: "F",
    status: "active",
  },
  {
    id: "12",
    name: "JJ",
    email: "jj@example.com",
    gender: "M",
    status: "inactive",
  },
  {
    id: "13",
    name: "KK",
    email: "kk@example.com",
    gender: "F",
    status: "active",
  },
  {
    id: "14",
    name: "LL",
    email: "ll@example.com",
    gender: "O",
    status: "active",
  },
  {
    id: "15",
    name: "MM",
    email: "mm@example.com",
    gender: "M",
    status: "inactive",
  },
];

export const dataPool: DataPool<User> = {
  getAll: () => {
    return deepCopy(_data);
  },
  add: (user) => {
    const index = _data.length - 1;
    const lastId = Number(_data[index]?.id) || 0;

    user.id = String(lastId + 1);

    _data.push(user);
  },
  update: (user) => {
    const index = _data.findIndex(({ id }) => {
      return id === user.id;
    });
    if (index === -1) {
      throw new Error("使用者不存在");
    } else {
      _data[index] = user;
    }
  },
  delete: ({ id: userId }) => {
    const index = _data.findIndex(({ id }) => {
      return id === userId;
    });
    if (index === -1) {
      return;
    }
    _data.splice(index, 1);
  },
};
