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
  const response = await axiosInstance.get("/students?teacherId=" + teacherId);
  return response.data;
};

export const createStudent = async (param) => {
  const response = await axiosInstance.post("/students", param);
  return response.data;
};
export const uploadStudentProfileImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axiosInstance.post("/students/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response.data);
  return response.data;
};

export const updateStudent = async (id, updateData) => {
  console.log(updateData);
  const response = await axiosInstance.put(`/students/${id}`, updateData);
  return response.data;
};

export const getPairHistory = async (teacherId) => {
  const response = await axiosInstance.get(`/pairHistory/${teacherId}`);
  return response.data;
};

export const savePairHistory = async (teacherId, tempPairs) => {
  const response = await axiosInstance.post(`/pairHistory/`, {
    teacherId: teacherId,
    pairs: tempPairs,
  });
  return response;
};
