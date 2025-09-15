import { User } from "@/types/User";
import { dataPool } from "@/app/api/_data/users";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user: User = await request.json();
  user.id = (await params).id;

  dataPool.update(user);

  return Response.json({
    message: "修改成功",
    user: user,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  dataPool.delete({ id: id } as User);
  return Response.json({
    message: "刪除成功",
  });
}
