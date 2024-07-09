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

  const renderNoStudentsView = () => (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-bold mb-8">
        파일 업로드해 학생을 등록해주세요.
      </h2>
      <div className="flex space-x-16">
        <div className="flex flex-col items-center">
          <div className="w-80 h-80 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
          </div>
          <button
            className="px-4 py-2 bg-[#397358] text-white rounded-md hover:bg-[#2c5744]"
            onClick={() => {
              /* Excel 파일 업로드 로직 */
            }}
          >
            Excel 파일 선택
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-80 h-80 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <button
            className="px-4 py-2 bg-[#397358] text-white rounded-md hover:bg-[#2c5744]"
            onClick={() => {
              /* OCR 이미지 업로드 로직 */
            }}
          >
            OCR 이미지 선택
          </button>
        </div>
      </div>
    </div>
  );

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
      {students.length === 0 ? (
        renderNoStudentsView()
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default StudentManagement;
