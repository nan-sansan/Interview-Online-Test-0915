import { dataPool } from "@/app/api/_data/users";

export async function POST(request: Request) {
  const { name, email } = await request.json();
  const allUsers = dataPool.getAll();

  const isLoginSuccess = allUsers.some((user) => {
    return user.name === name && user.email === email;
  });
  if (isLoginSuccess) {
    return Response.json({
      message: `登入成功`,
    });
  } else {
    return Response.json(
      {
        message: `登入失敗`,
      },
      { status: 401 },
    );
  }
}
