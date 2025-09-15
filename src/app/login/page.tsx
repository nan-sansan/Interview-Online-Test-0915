"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/userStore";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { User } from "@/types/User";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { taskWithErrorHandler } from "@/utils/taskHelper";

export default function LoginPage() {
  const { login } = useAuthStore();
  const router = useRouter();
  const form = useForm<User>({
    defaultValues: { name: "", email: "" },
    mode: "onChange",
  });

  const onSubmit = async (values: User) => {
    taskWithErrorHandler({
      task: async () => {
        await login(values.name, values.email);
        toast.success("登入成功");
        router.push("/");
      },
      onError: (e) => {
        toast.error(e.message);
      },
    });
  };
  return (
    <div className="flex w-[calc(100%-150px)] h-[calc(100%-50px)] items-center justify-center ">
      <div className="w-[500px] h-[300px] bg-white/60 mx-auto flex flex-col gap-3 p-[20px] rounded-md shadow-xs ">
        <h1 className="text-2xl font-bold">登入</h1>
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                rules={{
                  required: "請輸入員工名稱",
                  pattern: {
                    value: /\S+/,
                    message: "名稱不能是空白",
                  },
                }}
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>帳號名稱</FormLabel>
                    <FormControl>
                      <Input placeholder="exampleAccount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                rules={{
                  required: "請輸入電子郵件",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "請輸入有效的電子郵件地址",
                  },
                }}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>電子郵件</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button className="w-20" type="submit">
                  送出
                </Button>
              </div>
            </form>
          </Form>
        </>
      </div>
    </div>
  );
}
