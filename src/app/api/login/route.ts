import apiClientServerSide from "@/app/api/utils/apiClientServerSide";
import { User } from "@/types/User";
import { cookies } from "next/headers";
import { setAuthCookie } from "@/app/api/utils/cookieHelper";

export async function POST(request: Request) {
  const { name, email } = await request.json();
  const { data: res } = await apiClientServerSide.get("/v2/users", {
    params: { name: name, email: email, per_page: 999999 },
  });

  const data = res.filter((user: User) => {
    return user.name === name && user.email === email;
  });

  const hasUser = data?.length > 0;
  if (!hasUser) {
    return Response.json(
      {
        message: `登入失敗: name 或 email 錯誤`,
      },
      { status: 401 },
    );
  }
  if (data[0].status === "active") {
    const cookieStore = await cookies();
    setAuthCookie(cookieStore, data[0].id);

    return Response.json({
      message: `登入成功`,
    });
  } else {
    return Response.json(
      {
        message: `登入失敗: 該帳號不在活躍狀態`,
      },
      { status: 403 },
    );
  }
}
