import { User } from "@/types/User";
import { dataPool } from "@/app/api/_data/users";

export async function POST(request: Request) {
  const user: User = await request.json();
  const allUser = dataPool.getAll();
  const found = allUser.find(({ name, email }) => {
    return user.name === name || user.email === email;
  });

  if (found) {
    return Response.json(
      {
        message: "已存在的使用者",
      },
      {
        status: 400,
      },
    );
  } else {
    dataPool.add(user);
    const all = dataPool.getAll();
    const lastUser = all[all.length - 1];
    return Response.json({ message: "新增成功", user: lastUser });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const gender = searchParams.get("gender");
  const status = searchParams.get("status");
  const page = Number(searchParams.get("page")) || 0;
  const size = Number(searchParams.get("size")) || 10;

  const allUser = dataPool.getAll();
  console.log(allUser);
  const users = allUser.filter((user) => {
    if (id && user.id !== id) return false;
    if (name && user.name !== name) return false;
    if (email && user.email !== email) return false;
    if (gender && user.gender !== gender) return false;
    if (status && user.status !== status) return false;

    return true;
  });
  const total = users.length;
  const startIndex = page * size;
  const endIndex = startIndex + size;

  return Response.json({ users: users.slice(startIndex, endIndex), total });
}
