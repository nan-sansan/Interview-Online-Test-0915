"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { User } from "@/types/User";
import { useUserRepo } from "@/hooks/useUserRepo";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("O");
  const router = useRouter();
  const userRepo = useUserRepo();
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

    try {
      await userRepo.create(newUser);
      toast.success("註冊成功");
      //註冊完直接登入
      router.push("/login");
    } catch {
      toast.error("註冊失敗");
    }
  };

  return (
    <div className="flex w-[calc(100%-150px)] h-[calc(100%-50px)] items-center justify-center ">
      <div className="bg-white/60  w-[500px] mx-auto flex flex-col gap-5 p-[20px] rounded-md shadow-xs">
        <>
          <h1 className="text-2xl font-bold">註冊</h1>
        </>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              rules={{
                required: "請輸入名稱",
                pattern: {
                  value: /^[A-Za-z0-9_]+$/,
                  message: "只能輸入英文、數字或底線",
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
            <FormField
              rules={{
                required: "請選擇性別",
              }}
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>性別</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex"
                    >
                      <div className="flex gap-3">
                        <RadioGroupItem value="M" id="r1" />
                        <Label htmlFor="r1">男</Label>
                      </div>
                      <div className="flex gap-3">
                        <RadioGroupItem value="F" id="r2" />
                        <Label htmlFor="r2">女</Label>
                      </div>
                      <div className="flex gap-3">
                        <RadioGroupItem value="O" id="r3" />
                        <Label htmlFor="r3">其他</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
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
