import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000, // 10초 타임아웃
  headers: {
    "Content-Type": "application/json",
    // 필요한 경우 추가 헤더 설정
  },
});

// 응답 인터셉터 추가
axiosInstance.interceptors.response.use(
  (response) => {
    // 응답 데이터 가공 또는 추가 작업 수행
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 404:
          toast.error("데이터를 찾을 수 없습니다.");
          console.error("데이터를 찾을 수 없습니다.", data.error);
          break;
        case 500:
          toast.error("서버 오류가 발생했습니다.");
          console.error("서버 오류가 발생했습니다.", data.error);
          break;
        default:
          toast.error("요청 중 오류가 발생했습니다.");
          console.error("요청 중 오류가 발생했습니다.", data.error);
      }
    } else if (error.request) {
      toast.error("응답을 받지 못했습니다.");
      console.error("응답을 받지 못했습니다.", error.message);
    } else {
      toast.error("요청 설정 중 오류가 발생했습니다.");
      console.error("요청 설정 중 오류가 발생했습니다.", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
