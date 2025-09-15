"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback, useEffect, useState } from "react";
import { User } from "@/types/User";
import { useUserRepo } from "@/hooks/useUserRepo";

export default function ListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);

  const userRepo = useUserRepo();

  const loadData = useCallback(
    async (page: number, size: number) => {
      const { content, total } = await userRepo.query({ page, pageSize: size });
      setUsers(content);
      setTotal(total);
    },
    [userRepo],
  );

  useEffect(() => {
    void loadData(page, size);
  }, [page, size, loadData]);

  async function handleDelete(userId: string, username: string) {
    const isConfirm = confirm(`確定要刪除 ${username} 用戶？`);
    if (isConfirm) {
      await userRepo.delete({ id: userId } as User);
      await loadData(page, size);
    }
  }
  return (
    <div className="flex flex-col w-full h-full items-center justify-between gap-5 py-10 ">
      <h1 className="text-2xl  font-bold w-[1000px]">用戶列表</h1>
      <div className="flex-1 bg-white/60 p-3 rounded-md shadow-xs overflow-y-auto">
        <Table className="w-[1000px] mx-auto p-[20px] ">
          <TableHeader>
            <TableRow>
              <TableHead>帳號</TableHead>
              <TableHead>電子郵件</TableHead>
              <TableHead>性別</TableHead>
              <TableHead colSpan={2}>狀態</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users &&
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>
                    <Select
                      defaultValue={user.status}
                      onValueChange={async (value: "active" | "inactive") =>
                        await userRepo.update({ ...user, status: value })
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="選擇狀態" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>狀態</SelectLabel>
                          <SelectItem value="active">活躍帳戶</SelectItem>
                          <SelectItem value="inactive">非活躍帳戶</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleDelete(user.id, user.name);
                      }}
                    >
                      刪除
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex gap-2">
        <Select onValueChange={(value) => setSize(Number(value))}>
          <SelectTrigger>{size}</SelectTrigger>
          <SelectContent>
            {["5", "10", "15", "20", "50"].map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          上一頁
        </Button>
        <Button
          variant="outline"
          disabled={page === Math.ceil(total / size) - 1}
          onClick={() => setPage(page + 1)}
        >
          下一頁
        </Button>
      </div>
    </div>
  );
}
