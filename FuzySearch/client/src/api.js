import axios from "axios";

// Chỉnh lại URL backend của bạn, ví dụ chạy ở localhost:4000
const api = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 5000
});

export default api;
