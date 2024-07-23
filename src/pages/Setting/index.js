import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaCog } from "react-icons/fa";
import authStore from "../../stores/AuthStore";
import { useNavigate } from "react-router-dom";
import { updateTeacher, uploadProfileImage } from "../../service/apiService";
import TeacherImage from "../../assets/image/character/Teacher_1.png";
import EditIcon from "../../assets/image/icons/icon-edit.svg";
// 프로필 컴포넌트
const ProfilePanel = ({
  onSave,
  onCancel,
  onLogout,
  formData,
  handleChange,
}) => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(formData.imageUrl);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        handleChange({ target: { name: "image", files: [file] } }); // 파일 업로드를 부모 컴포넌트로 전달
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-[#F8F7F4] p-6 rounded-lg">
      <div className="flex justify-end">
        <button
          onClick={onSave}
          className="bg-[#397358] text-white px-4 py-2 rounded mr-2"
        >
          저장하기
        </button>
        <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
          취소하기
        </button>
      </div>

      <div className="flex flex-col items-start mb-4">
        <span className="text-sm text-gray-600 mb-2">프로필 사진</span>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            ref={fileInputRef}
          />
          <div
            onClick={handleImageClick}
            className="flex cursor-pointer relative"
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="프로필"
                className="w-24 h-24 object-cover rounded-full mx-auto border border-[#e9e9e9]"
              />
            ) : (
              <img
                src={formData.imageUrl}
                alt="프로필미리보기"
                className="w-24 h-24 object-cover rounded-full mx-auto border border-[#e9e9e9]"
              />
            )}
            <div className="absolute bottom-0 right-0 bg-[#397358] rounded-full p-1 cursor-pointer">
              <img className="w-4 h-4" src={EditIcon} alt="editIcon" />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2">이름</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">반</label>
        <input
          type="text"
          name="classInfo"
          value={formData.classInfo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex justify-end mt-32">
        <button
          onClick={onLogout}
          className="bg-[#397358] text-white px-4 py-2 rounded mr-2"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};
// 계정 설정 페이지 컴포넌트
function Setting() {
  const [activeMenu, setActiveMenu] = useState("profile");
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    classInfo: "",
  });
  const navigate = useNavigate();

  const menuItemStyle =
    "flex items-center p-4 cursor-pointer transition-all duration-200";
  const activeStyle = "bg-[#397358] text-white";
  const inactiveStyle = "bg-[#FDFAF5] hover:bg-[#E9E5DD]";

  useEffect(() => {
    setFormData({
      name: authStore.teacherInfo.name || "",
      imageUrl: authStore.teacherInfo.imageUrl || TeacherImage,
      classInfo: authStore.teacherInfo.classInfo || "",
    });
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let updatedFormData = { ...formData };

    if (imageFile) {
      try {
        const imageData = await uploadProfileImage(imageFile);
        updatedFormData = {
          ...updatedFormData,
          imageUrl: imageData.location,
        };
        setFormData(updatedFormData); // 상태 업데이트
      } catch (error) {
        alert("이미지 업로드에 실패했습니다.");
        return;
      }
    }

    try {
      await updateTeacher(authStore.user._id, updatedFormData);
      authStore.setTeacherInfo(authStore.user._id);

      alert("프로필 정보가 성공적으로 업데이트되었습니다.");
    } catch (error) {
      alert("프로필 정보 업데이트에 실패했습니다: " + error.message);
    }
  };

  const handleCancel = () => {
    // 취소 로직 구현
    console.log("취소됨");
  };

  const handleLogout = async () => {
    try {
      await authStore.logout(); // 로그아웃 API 호출 (authStore에 로그아웃 함수가 있다고 가정)
      authStore.setUser(null); // 사용자 정보를 null로 설정
      navigate("/signin", { replace: true }); // 로그인 페이지로 이동
    } catch (error) {
      console.error("Logout failed:", error.message);
      // 에러 처리 로직 추가
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setImageFile(files[0]);
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white p-16">
      <h1 className="text-2xl font-bold mb-6">프로필 수정 및 설정</h1>
      {/* 좌측 메뉴 */}
      <div className="flex mt-4">
        <div className="bg-white rounded-lg w-64 mr-8">
          <ul
            className="divide-y divide-gray-200 shadow-md"
            style={{ borderRadius: "12px" }}
          >
            <li
              className={`${menuItemStyle} ${
                activeMenu === "profile" ? activeStyle : inactiveStyle
              }`}
              style={{ borderRadius: "12px 12px 0 0" }}
              onClick={() => setActiveMenu("profile")}
            >
              <FaUserCircle className="mr-3 text-xl" />
              <span>선생님 프로필</span>
            </li>
            <li
              className={`${menuItemStyle} ${
                activeMenu === "account" ? activeStyle : inactiveStyle
              }`}
              style={{ borderRadius: "0 0 12px 12px" }}
              onClick={() => setActiveMenu("account")}
            >
              <FaCog className="mr-3 text-xl" />
              <span>계정 관리</span>
            </li>
          </ul>
        </div>

        <div className="w-3/4">
          {activeMenu === "profile" && (
            <ProfilePanel
              formData={formData}
              onSave={handleFormSubmit}
              onCancel={handleCancel}
              onLogout={handleLogout}
              handleChange={handleChange}
            />
          )}
          {activeMenu === "account" && <div>계정 관리 내용</div>}
        </div>
      </div>
    </div>
  );
}

export default Setting;
