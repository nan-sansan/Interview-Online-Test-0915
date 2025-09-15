"use client";

import { useAuthStore } from "@/stores/userStore";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { workRoute } from "@/config/config";
import { useRouter } from "next/navigation";
import { isShouldShow } from "@/utils/routeHelper";

export default function WelcomePage() {
  const { name, logout } = useAuthStore();
  const router = useRouter();
  return (
    <div className="flex w-[calc(100%-150px)] h-[calc(100%-50px)] items-center justify-center">
      <div className="w-[800px] p-[20px] mx-auto flex flex-col items-center justify-center gap-8 rounded-md">
        {name && (
          <div className="flex justify-center items-center gap-1">
            <h1 className="text-3xl font-bold">HI！{name} 歡迎回來</h1>
            <Button
              variant="ghost"
              onClick={() => {
                logout();
              }}
            >
              <LogOut></LogOut>
            </Button>
          </div>
        )}
        <div className="flex gap-6">
          {workRoute.map((route, index) => {
            const Icon = route.icon;
            if (isShouldShow(route, !!name)) {
              return (
                <div
                  onClick={() => {
                    router.push(route.path);
                  }}
                  key={index}
                >
                  <div
                    className={cn(
                      "bg-white/60 cursor-pointer hover:bg-white/80 hover:shadow-md transition-all duration-75 w-[150px] h-[150px]",
                      "pb-3 pr-3 text-xl rounded-md shadow-xs border-1 border-green-50",
                      "flex flex-col gap-1 items-end justify-end",
                      "hover:shadow-sm hover:border-gray-50 hover:translate-y-[-4px] hover:scale-105",
                    )}
                  >
                    <div className="w-full flex justify-center text-green-800 opacity-70">
                      <Icon size={75} />
                    </div>
                    <div className=" border-b  text-green-800 border-green-800 pl-5 font-bold opacity-90">
                      {route.display}
                    </div>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  );
}
