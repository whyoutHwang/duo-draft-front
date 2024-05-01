import React, { useEffect, useState } from "react";
import {
  getStudent,
  createStudent,
  updateStudent,
} from "../../service/apiService";
import AuthStore from "../../stores/AuthStore";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import styles from "./StudentManagement.module.css";

function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    // favoriteFriend: [],
    // foughtFriend: [],
    teacherId: "",
  });

  const [showSidebar, setShowSidebar] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useAuthRedirect();

  useEffect(() => {
    const fetchStudentsData = async () => {
      const data = await getStudent(AuthStore.user._id);
      setStudents(data);
    };

    fetchStudentsData();
  }, []);

  const toggleSidebar = () => {
    if (showSidebar) {
      setFormData({
        name: "",
        gender: "",
      });
    }
    setShowSidebar(!showSidebar);
  };

  const startEditing = (student) => {
    setFormData({
      name: student.name,
      gender: student.gender,
      teacherId: student.teacher_id,
      id: student._id,
      // favoriteFriend: student.favoriteFriend,
      // foughtFriend: student.foughtFriend,
    });
    setEditingStudentId(student._id);
    setIsEditing(true);
    toggleSidebar(); // 사이드바를 열어 수정 폼을 보여줍니다.
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "favoriteFriend" || name === "foughtFriend") {
      // 배열 데이터를 처리합니다. 예시에서는 쉼표로 구분된 문자열을 배열로 변환합니다.
      setFormData({ ...formData, [name]: value.split(",") });
    } else {
      console.log(name, value);
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      // 업데이트 처리 로직
      await handleUpdate();
    } else {
      // 새 학생 추가 처리 로직
      await handleCreate();
    }
  };
  const handleCreate = async (e) => {
    try {
      const response = await createStudent(formData); // API 호출
      setStudents([...students, response]);
      toggleSidebar();
      alert("학생 정보가 성공적으로 등록되었습니다.");
    } catch (error) {
      alert("학생 정보 등록에 실패했습니다: " + error.message);
    }
  };

  const handleUpdate = async (e) => {
    try {
      const response = await updateStudent(editingStudentId, formData); // API 호출
      const updatedStudents = students.map((student) =>
        student.id === editingStudentId ? response : student
      );
      setStudents(updatedStudents);
      setIsEditing(false);
      setEditingStudentId(null);
      toggleSidebar();
      alert("학생 정보가 성공적으로 업데이트되었습니다.");
    } catch (error) {
      alert("학생 정보 업데이트에 실패했습니다: " + error.message);
    }
  };

  return (
    <div className="flex-col h-screen bg-gray-100 justify-center items-center ">
      <button onClick={toggleSidebar}>등록하기</button>
      {showSidebar && (
        <div
          className={`fixed top-0 right-0 w-96 bg-white p-6 rounded-l-lg shadow-lg transform ${
            showSidebar ? styles.sidebarOpen : styles.sidebarClosed
          } overflow-y-auto h-screen`}
        >
          <div className="flex justify-between items-center">
            <div className="flex-col">
              <div className="flex">
                <h2 className="font-semibold text-lg">학생 정보 입력</h2>
              </div>
              <form onSubmit={handleFormSubmit} className="flex-col space-y-4">
                <div>
                  <label>이름:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>성별:</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">남</option>
                    <option value="여">여</option>
                  </select>
                </div>
                <div className="flex justify-center">
                  <button type="submit">저장</button>
                  <button className="ml-20" onClick={toggleSidebar}>
                    닫기
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <table className="min-w-full table-fixed text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              이름
            </th>
            <th scope="col" className="py-3 px-6">
              성별
            </th>
            {/* <th scope="col" className="py-3 px-6">
              좋아하는 친구
            </th>
            <th scope="col" className="py-3 px-6">
              싫어하는 친구
            </th> */}
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr
              key={student._id}
              onClick={() => startEditing(student)}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="py-4 px-6">{student.name}</td>
              <td className="py-4 px-6">{student.gender}</td>
              {/* <td className="py-4 px-6">
                {arrayToString(student.favorite_friends)}
              </td>
              <td className="py-4 px-6">
                {arrayToString(student.fought_friends)}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentManagement;
