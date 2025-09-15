"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User } from "@/types/User";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { taskWithErrorHandler } from "@/utils/taskHelper";
import { userRepoWithFetch } from "@/repo/userRepoWithFetch";

export default function RegisterPage() {
  const form = useForm<User>({
    defaultValues: {
      name: "",
      email: "",
      gender: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: User) => {
    const newUser: User = {
      id: "",
      name: values.name,
      email: values.email,
      gender: values.gender,
      status: "active",
    };
    taskWithErrorHandler({
      task: async () => {
        await userRepoWithFetch.create(newUser);
        toast.success("員工登錄成功");
        form.reset({
          name: "",
          email: "",
          gender: "",
        });
      },
      onError: (error) => {
        toast.error("員工登錄失敗 " + error.message);
      },
    });
  };

  return (
    <div className="flex w-[calc(100%-150px)] h-[calc(100%-50px)] items-center justify-center ">
      <div className="bg-white/60  w-[500px] mx-auto flex flex-col gap-5 p-[20px] rounded-md shadow-xs">
        <>
          <h1 className="text-2xl font-bold">員工登錄</h1>
        </>
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
                  <FormLabel>員工名稱</FormLabel>
                  <FormControl>
                    <Input placeholder="請輸入員工名稱: 王小明" {...field} />
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
                  <FormLabel>員工電子郵件</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="請輸入員工電子郵件: example@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              rules={{
                required: "請選擇員工性別",
              }}
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>員工性別</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex"
                    >
                      <div className="flex gap-3">
                        <RadioGroupItem value="male" id="r1" />
                        <Label htmlFor="r1">男</Label>
                      </div>
                      <div className="flex gap-3">
                        <RadioGroupItem value="female" id="r2" />
                        <Label htmlFor="r2">女</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">送出</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
