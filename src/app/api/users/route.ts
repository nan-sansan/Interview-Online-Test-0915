import { User } from "@/types/User";
import apiClientServerSide from "@/app/api/utils/apiClientServerSide";
import { taskWithErrorHandler } from "@/utils/taskHelper";

export async function POST(request: Request) {
  const postUser: User = await request.json();

  return taskWithErrorHandler({
    task: async () => {
      const { data } = await apiClientServerSide({
        url: "/v2/users",
        method: "POST",
        data: postUser,
      });
      return Response.json({ message: "新增成功", user: data });
    },
    onError: (e) => {
      return Response.json({ message: "新增失敗: " + e.message });
    },
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const gender = searchParams.get("gender");
  const status = searchParams.get("status");
  const page = Number(searchParams.get("page")) || 0;
  const size = Number(searchParams.get("size")) || 10;
  return taskWithErrorHandler({
    task: async () => {
      const { data, headers } = await apiClientServerSide({
        url: "/v2/users",
        method: "GET",
        params: {
          name,
          email,
          gender,
          status,
          page: page + 1,
          per_page: size,
        },
      });
      const total = Number(headers["x-pagination-total"]) || 0;

      return Response.json({ users: data, total });
    },
    onError: (e) => {
      return Response.json({ message: "獲取資料失敗: " + e.message });
    },
  });
}
