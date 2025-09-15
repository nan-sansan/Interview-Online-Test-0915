import apiClient from "@/apis/config/apiClient";

export const loginApi = async (name: string, email: string) => {
  try {
    await apiClient({
      method: "POST",
      url: "/api/login",
      data: { name: name, email: email },
    });
    return true;
  } catch {
    return false;
  }
};
