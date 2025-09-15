import apiClientServerSide from "@/app/api/utils/apiClientServerSide";
import { User } from "@/types/User";
import { taskWithErrorHandler } from "@/utils/taskHelper";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  return taskWithErrorHandler({
    task: async () => {
      const user: User = await request.json();
      const id = (await params).id;

      const { data } = await apiClientServerSide.put(`v2/users/${id}`, user);

      return Response.json(
        {
          message: "修改成功",
          user: data,
        },
        { status: 200 },
      );
    },
    onError: (e) => {
      return Response.json(
        { message: "伺服器錯誤: " + e.message },
        { status: 500 },
      );
    },
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  return taskWithErrorHandler({
    task: async () => {
      const id = (await params).id;

      await apiClientServerSide.delete(`v2/users/${id}`);

      return Response.json(
        {
          message: "刪除成功",
        },
        { status: 200 },
      );
    },
    onError: (e) => {
      return Response.json(
        { message: "伺服器錯誤: " + e.message },
        { status: 500 },
      );
    },
  });
}
