// services/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // 실제 서버 주소로 대체
  timeout: 10000, // 10초 타임아웃
  headers: {
    "Content-Type": "application/json",
    // 필요한 경우 추가 헤더 설정
  },
});

export default axiosInstance;
