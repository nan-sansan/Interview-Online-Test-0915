import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const cookieName = "session";
export const setAuthCookie = (
  cookieStore: ReadonlyRequestCookies,
  userId: string,
) => {
  cookieStore.set(cookieName, userId, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 30,
  });
};

export const getAuthCookie = (cookieStore: ReadonlyRequestCookies) => {
  return cookieStore.get(cookieName)?.value;
};

export const getUnAuthResponse = () => {
  return Response.json(
    { message: "使用者未登入" },
    {
      status: 401,
    },
  );
};

export const cleatAuthCookie = (cookieStore: ReadonlyRequestCookies) => {
  return cookieStore.delete(cookieName);
};
