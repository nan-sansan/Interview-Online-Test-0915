import axios from "axios";

const apiClientServerSide = axios.create({
  baseURL: "https://gorest.co.in/public/",
  timeout: 30000,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`,
    "Content-Type": "application/json",
  },
});

apiClientServerSide.interceptors.response.use(
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

export default apiClientServerSide;
