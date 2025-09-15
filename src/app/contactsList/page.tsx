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
import { useEffect, useState } from "react";
import { User } from "@/types/User";
import Pagination from "@/components/common/Pagination";
import { taskWithErrorHandler } from "@/utils/taskHelper";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { userRepoWithLocal } from "@/repo/userRepoWithLocal";

type UserQuery = {
  equal: Partial<User>;
  page: number;
  pageSize: number;
};

export default function ListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState<UserQuery>({
    equal: {},
    page: 0,
    pageSize: 10,
  });

  const [total, setTotal] = useState(0);
  const [keywordName, setKeywordName] = useState("");
  const [keywordMail, setKeywordMail] = useState("");

  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<Partial<User>>({});

  const loadData = async (query: UserQuery) => {
    await taskWithErrorHandler({
      task: async () => {
        const { content, total } = await userRepoWithLocal.query(query);
        setUsers(content);
        setTotal(total);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  async function handleSave(user: User) {
    await taskWithErrorHandler({
      task: async () => {
        await userRepoWithLocal.update({
          ...user,
          ...editingData, // 把編輯後的資料覆蓋
        });

        await loadData(query);

        setEditingUserId(null);
        setEditingData({});

        toast.success(`${user.name} 已更新成功`);
      },
      onError: (e) => {
        toast.error(`更新失敗：${e.message}`);
      },
    });
  }

  useEffect(() => {
    void loadData(query);
  }, [query]);

  async function handleDelete(userId: string, username: string) {
    const isConfirm = confirm(`確定要刪除 ${username} 用戶？`);
    if (isConfirm) {
      void taskWithErrorHandler({
        task: async () => {
          await userRepoWithLocal.delete({ id: userId } as User);
          await loadData(query);
          toast.success(`${username} 已被刪除`);
        },
        onError: (e) => {
          toast.error(e.message);
        },
      });
    }
  }
  return (
    <div className="flex flex-col w-full h-full items-center justify-between gap-5 py-10 ">
      <div className="flex w-[calc(100%-100px)] items-center justify-center gap-2">
        <h1 className="text-2xl  font-bold w-[1000px]">常用聯絡人</h1>
        <div className="p-2">
          <Input
            value={keywordMail}
            onChange={(e) => setKeywordMail(e.target.value)}
            className="w-[300px] "
            placeholder="請輸入欲搜尋的電子郵件"
          ></Input>
        </div>
        <div className="p-2">
          <Input
            value={keywordName}
            onChange={(e) => setKeywordName(e.target.value)}
            className="w-[300px] "
            placeholder="請輸入欲搜尋的員工名稱"
          ></Input>
        </div>
        <Button
          onClick={() => {
            setQuery({
              equal: {
                name: keywordName || undefined,
                email: keywordMail || undefined,
              },
              page: 0,
              pageSize: query.pageSize,
            });
          }}
        >
          搜尋
        </Button>
        <Button
          onClick={() => {
            setKeywordMail("");
            setKeywordName("");
            setQuery({
              equal: {},
              page: 0,
              pageSize: query.pageSize,
            });
          }}
        >
          重置
        </Button>
      </div>
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
                  {/* 帳號 */}
                  <TableCell>
                    {editingUserId === user.id ? (
                      <Input
                        value={editingData.name ?? user.name}
                        onChange={(e) =>
                          setEditingData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      user.name
                    )}
                  </TableCell>

                  {/* Email */}
                  <TableCell>
                    {editingUserId === user.id ? (
                      <Input
                        value={editingData.email ?? user.email}
                        onChange={(e) =>
                          setEditingData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      user.email
                    )}
                  </TableCell>

                  {/* 性別 */}
                  <TableCell>
                    {editingUserId === user.id ? (
                      <Select
                        value={editingData.gender ?? user.gender}
                        onValueChange={(value) =>
                          setEditingData((prev) => ({ ...prev, gender: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="選擇性別" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">男性</SelectItem>
                          <SelectItem value="female">女性</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : user.gender === "male" ? (
                      "男性"
                    ) : (
                      "女性"
                    )}
                  </TableCell>

                  {/* 狀態 */}
                  <TableCell>
                    {editingUserId === user.id ? (
                      <Select
                        value={editingData.status ?? user.status}
                        onValueChange={(value) =>
                          setEditingData((prev) => ({ ...prev, status: value }))
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
                    ) : user.status === "active" ? (
                      "活躍帳戶"
                    ) : (
                      "非活躍帳戶"
                    )}
                  </TableCell>

                  {/* 刪除 */}
                  <TableCell className="flex gap-3">
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(user.id, user.name)}
                    >
                      刪除
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <Pagination
        query={query}
        onQueryChangeAction={({ page, pageSize }) => {
          setQuery({
            equal: query.equal,
            page,
            pageSize,
          });
        }}
        total={total}
      />
    </div>
  );
}
