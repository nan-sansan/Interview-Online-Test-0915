"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuthStore } from "@/stores/userStore";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { name, logout } = useAuthStore();
  const router = useRouter();

  return (
    <div className="shadow-xs sticky w-full h-[50px] bg-yellow-50/40 flex justify-between items-center">
      <div
        className="flex justify-center items-center w-[150px] h-[50px] border cursor-pointer hover:bg-green-100/20 "
        onClick={() => {
          router.push("/");
        }}
      >
        首頁
      </div>
      {name && (
        <>
          <div>
            {name}
            <Button
              variant="ghost"
              onClick={() => {
                logout();
              }}
            >
              <LogOut></LogOut>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
