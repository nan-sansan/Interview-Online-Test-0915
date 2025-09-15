import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 30000,
});

apiClient.interceptors.response.use(
  (response) => {
    // 請求成功時可統一處理資料格式
    return response;
  },
  (error) => {
    // 請求失敗時統一處理錯誤
    console.error("API Error:", error.message);
    return Promise.reject(error);
  },
);

export default apiClient;
