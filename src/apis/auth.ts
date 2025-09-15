import apiClient from "@/apis/config/apiClient";

export const loginApi = async (name: string, email: string) => {
  return await apiClient({
    method: "POST",
    url: "/api/login",
    data: { name: name, email: email },
  });
};
