// services/signupService.js
import axiosInstance from "./axios"; // axios 인스턴스를 임포트합니다.

export const signup = async (userData) => {
  console.log(userData);
  const response = await axiosInstance.post("/user/signup", userData); // baseURL이 이미 설정되어 있으므로, 전체 URL 대신 경로만 지정합니다.
  return response.data;
};
export const signin = async (userData) => {
  console.log(userData);
  const response = await axiosInstance.post("/user/signin", userData); // baseURL이 이미 설정되어 있으므로, 전체 URL 대신 경로만 지정합니다.
  return response.data;
};
