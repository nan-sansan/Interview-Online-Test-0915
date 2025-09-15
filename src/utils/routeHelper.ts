import { RouteItem } from "@/config/config";

export const isShouldShow = (item: RouteItem, isLogin: boolean) => {
  if (item.loginDisable === undefined) {
    return true;
  }

  return item.loginDisable ? !isLogin : isLogin;
};
