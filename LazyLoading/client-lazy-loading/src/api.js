import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // trỏ đến backend API của bạn
});

export default API;
