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

export const createStudentsBatch = async (studentsData, teacherId) => {
  const response = await axiosInstance.post("/students/batch", {
    students: studentsData,
    teacherId: teacherId,
  });

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
  return response.data;
};

export const updateStudent = async (id, updateData) => {
  const response = await axiosInstance.put(`/students/${id}`, updateData);
  return response.data;
};

export const getPairHistory = async (teacherId) => {
  const response = await axiosInstance.get(`/pairHistory/${teacherId}`);
  return response;
};

export const getPairHistoryList = async (teacherId) => {
  const response = await axiosInstance.get(`/pairHistory/list/${teacherId}`);
  return response.data;
};

export const getSelectedPairHistory = async (teacherId, historyId) => {
  const response = await axiosInstance.get(
    `/pairHistory/${teacherId}/${historyId}`
  );
  return response.data;
};

export const savePairHistory = async (teacherId, tempPairs) => {
  const response = await axiosInstance.post(`/pairHistory/`, {
    teacherId: teacherId,
    pairs: tempPairs,
  });
  return response;
};

export const uploadProfileImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axiosInstance.post("/user/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateTeacher = async (id, updateData) => {
  let formData;
  if (updateData instanceof FormData) {
    formData = updateData;
  } else {
    formData = new FormData();
    for (const key in updateData) {
      formData.append(key, updateData[key]);
    }
  }

  const response = await axiosInstance.put(`/user/teacher/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getTeacherInfo = async (teacherId) => {
  const response = await axiosInstance.get(`/user/teacher/${teacherId}`);
  return response.data;
};

// 모든 게시글 가져오기
export const getPosts = async (postType, searchTerm, page, limit) => {
  try {
    const response = await axiosInstance.get("/posts", {
      params: {
        postType: postType === "전체" ? undefined : postType,
        searchTerm,
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("게시글을 가져오는 중 오류 발생:", error);
    throw error;
  }
};

// 새 게시글 생성
export const createPost = async (postData) => {
  try {
    const response = await axiosInstance.post("/posts", postData);
    return response.data;
  } catch (error) {
    console.error("게시글 생성 중 오류 발생:", error);
    throw error;
  }
};

export const uploadPostImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axiosInstance.post("/posts/upload-images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// ID로 특정 게시글 가져오기
export const getPostById = async (id) => {
  try {
    const response = await axiosInstance.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("게시글을 가져오는 중 오류 발생:", error);
    throw error;
  }
};

// 게시글 수정
export const updatePost = async (id, postData) => {
  try {
    const response = await axiosInstance.put(`/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error("게시글 수정 중 오류 발생:", error);
    throw error;
  }
};

// 게시글 삭제
export const deletePost = async (id, teacherId) => {
  try {
    const response = await axiosInstance.delete(`/posts/${id}`, {
      data: { teacherId },
    });
    return response.data;
  } catch (error) {
    console.error("게시글 삭제 중 오류 발생:", error);
    throw error;
  }
};
