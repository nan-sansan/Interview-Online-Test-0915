import { cleatAuthCookie } from "@/app/api/utils/cookieHelper";
import { cookies } from "next/headers";

export async function GET() {
  cleatAuthCookie(await cookies());
  return Response.json({ message: "使用者登出" });
}
