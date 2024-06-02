import React, { useEffect, useState } from "react";
import {
  getStudent,
  createStudent,
  updateStudent,
} from "../../service/apiService";
import AuthStore from "../../stores/AuthStore";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import Sidebar from "../../components/Sidebar";
import StudentList from "../../components/StudentList";
import ToggleButton from "../../components/ToggleButton";

function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    favoriteFriend: [],
    foughtFriend: [],
    teacherId: "",
  });
  const [showSidebar, setShowSidebar] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [viewMode, setViewMode] = useState("card");

  useAuthRedirect();

  useEffect(() => {
    const fetchStudentsData = async () => {
      const data = await getStudent(AuthStore.user._id);
      setFormData({ ...formData, teacherId: AuthStore.user._id });
      setStudents(data);
    };

    fetchStudentsData();
  }, []);

  const toggleSidebar = () => {
    if (showSidebar) {
      setFormData({
        name: "",
        gender: "",
        favoriteFriend: [],
        foughtFriend: [],
        teacherId: AuthStore.user._id,
      });
    }
    setShowSidebar(!showSidebar);
  };

  const startEditing = (student) => {
    setFormData({
      name: student.name,
      gender: student.gender,
      teacherId: student.teacher_id,
      favoriteFriend: student.favorite_friend || [],
      foughtFriend: student.fought_friend || [],
    });
    setEditingStudentId(student._id);
    setIsEditing(true);
    setShowSidebar(true); // 사이드바를 열어 수정 폼을 보여줍니다.
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    isEditing ? await handleUpdate() : await handleCreate();
  };

  const handleCreate = async () => {
    try {
      const response = await createStudent(formData);
      setStudents([...students, response]);
      toggleSidebar();
      alert("학생 정보가 성공적으로 등록되었습니다.");
    } catch (error) {
      alert("학생 정보 등록에 실패했습니다: " + error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await updateStudent(editingStudentId, formData);
      const updatedStudents = students.map((student) =>
        student._id === editingStudentId ? response : student
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
    <div className="flex-col h-screen justify-center items-center">
      <Sidebar
        formData={formData}
        students={students}
        handleChange={handleChange}
        handleFormSubmit={handleFormSubmit}
        toggleSidebar={toggleSidebar}
        isEditing={isEditing}
        isOpen={showSidebar}
      />
      <div className="flex justify-between items-center p-4">
        <h1 className="text-lg font-semibold">나의 친구들을 만나볼까요?</h1>
        <ToggleButton
          viewMode={viewMode}
          setViewMode={setViewMode}
          toggleSidebar={toggleSidebar}
        />
      </div>
      <StudentList
        students={students}
        viewMode={viewMode}
        onStudentClick={startEditing}
      />
    </div>
  );
}

export default StudentManagement;
