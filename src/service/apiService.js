// services/signupService.js
import axiosInstance from "./axios"; // axios 인스턴스를 임포트합니다.

export const signup = async (userData) => {
  const response = await axiosInstance.post("/user/signup", userData);
  return response.data;
};
export const signin = async (userData) => {
  const response = await axiosInstance.post("/user/signin", userData);
  return response.data;
};
export const getStudent = async (teacherId) => {
  console.log(teacherId);
  const response = await axiosInstance.get("/students?teacherId=" + teacherId);
  return response.data;
};

export const createStudent = async (param) => {
  console.log(param);
  const response = await axiosInstance.post("/students", param);
  return response.data;
};
export const updateStudent = async (id, updateData) => {
  const response = await axiosInstance.put(`/students/${id}`, updateData);
  return response.data;
};
