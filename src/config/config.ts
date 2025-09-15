import { List, LogIn, Send, UserPlus } from "lucide-react";

export type RouteItem = (typeof workRoute)[number];

export const workRoute = [
  {
    path: "/typeAccount",
    display: "名稱顯示",
    icon: Send,
  },
  { path: "/register", display: "註冊", icon: UserPlus, loginDisable: true },
  { path: "/login", display: "登入", icon: LogIn, loginDisable: true },
  { path: "/userList", display: "用戶列表", icon: List, loginDisable: false },
];
