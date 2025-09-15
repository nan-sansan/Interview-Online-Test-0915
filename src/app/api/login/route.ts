import apiClientServerSide from "@/app/api/utils/apiClientServerSide";

export async function POST(request: Request) {
  const { name, email } = await request.json();
  const { data } = await apiClientServerSide.get("/v2/users", {
    params: { name: name, email: email },
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
