"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function TypeAccount() {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState("");
  const handleSubmit = () => {
    if (!value.trim()) {
      toast.error("請輸入有效帳號");
      return;
    }
    setSubmitted(value.trim());
  };

  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="flex flex-col justify-center gap-5 mx-auto w-[500px] h-[250px] bg-white/60 p-[20px] rounded-md ">
        <h1 className="text-2xl font-bold">名稱顯示</h1>
        {submitted && (
          <div className="text-xl font-bold text-center">Hi, {submitted}!</div>
        )}
        <>
          <form></form>
          <Label htmlFor="acc">請輸入名稱</Label>
          <Input
            id="acc"
            type="text"
            placeholder="你的名稱"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          ></Input>
          <div className="flex justify-end">
            <Button className="w-20" onClick={handleSubmit}>
              送出
            </Button>
          </div>
        </>
      </div>
    </div>
  );
}
