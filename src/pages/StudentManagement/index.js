import React, { useEffect, useState } from "react";
import {
  getStudent,
  createStudent,
  updateStudent,
  uploadStudentProfileImage,
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
    imageUrl: "",
    height: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [viewMode, setViewMode] = useState("card");

  useAuthRedirect();

  useEffect(() => {
    const fetchStudentsData = async () => {
      const data = await getStudent(AuthStore.user._id);
      setFormData((prevFormData) => ({
        ...prevFormData,
        teacherId: AuthStore.user._id,
      }));
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
        imageUrl: "",
        height: "",
      });
      setImageFile(null);
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
      imageUrl: student.imageUrl || "",
      height: student.height || "",
    });
    setImageFile(null);
    setEditingStudentId(student._id);
    setIsEditing(true);
    setShowSidebar(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setImageFile(files[0]);
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let updatedFormData = { ...formData };

    if (imageFile) {
      try {
        const imageData = await uploadStudentProfileImage(imageFile);
        console.log("Image uploaded:", imageData);

        updatedFormData = {
          ...updatedFormData,
          imageUrl: imageData.location,
        };

        setFormData(updatedFormData); // 상태 업데이트
      } catch (error) {
        alert("이미지 업로드에 실패했습니다.");
        return;
      }
    } else {
      console.log("No image file to upload.");
    }

    if (isEditing) {
      await handleUpdate(updatedFormData);
    } else {
      await handleCreate(updatedFormData);
    }
  };

  const handleCreate = async (data) => {
    try {
      const response = await createStudent(data);
      setStudents((prevStudents) => [...prevStudents, response]);
      toggleSidebar();
      alert("학생 정보가 성공적으로 등록되었습니다.");
    } catch (error) {
      alert("학생 정보 등록에 실패했습니다: " + error.message);
    }
  };

  const handleUpdate = async (data) => {
    try {
      const response = await updateStudent(editingStudentId, data);
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
