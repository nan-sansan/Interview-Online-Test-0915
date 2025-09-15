import { List, LogIn, Send, UserPlus } from "lucide-react";

export type RouteItem = (typeof workRoute)[number];

export const workRoute = [
  { path: "/login", display: "使用者登入", icon: LogIn, loginDisable: true },
  {
    path: "/register",
    display: "員工登錄",
    icon: UserPlus,
    loginDisable: false,
  },
  { path: "/userList", display: "通訊錄列表", icon: List, loginDisable: false },
  //TODO
  { path: "/contactsList", display: "常用聯絡人", icon: Send },
];
