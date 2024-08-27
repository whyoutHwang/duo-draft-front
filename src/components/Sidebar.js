import React, { useState, useEffect, useRef, useMemo } from "react";
import styles from "./Sidebar.module.css";
import Select from "react-select";
import EditIcon from "../assets/image/icons/icon-edit.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { characterImages } from "../constants/characterImages";

const Sidebar = ({
  formData,
  students,
  handleChange,
  handleFormSubmit,
  toggleSidebar,
  isEditing,
  isOpen,
}) => {
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.classList.remove(styles.hidden);
        }
      }, 250);
    } else {
      document.body.style.overflow = "auto";
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.classList.add(styles.hidden);
        }
      }, 300); // 사이드바의 transition 시간과 동일하게 맞추기
    }
  }, [isOpen]);

  const [imagePreview, setImagePreview] = useState(
    formData.imageUrl || characterImages.Yellow
  );

  const handleSidebarClick = (e) => {
    e.stopPropagation(); // 이벤트 전파 중단
  };

  const handleSelectChange = (selectedOptions, { name }) => {
    const value = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    handleChange({ target: { name, value } });
  };

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

  const studentOptions = students.map((student) => ({
    value: student._id,
    label: student.name,
  }));

  const calculateAge = (birthDate) => {
    if (!birthDate) return "";
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age + "세";
  };

  const age = useMemo(
    () => calculateAge(formData.birthDate),
    [formData.birthDate]
  );

  return (
    <div
      ref={containerRef}
      className={styles.sidebarContainer}
      onClick={toggleSidebar}
    >
      <div
        className={`${styles.sidebar} ${
          isOpen ? styles.sidebarOpen : styles.sidebarClose
        }`}
        onClick={handleSidebarClick}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-lg">
            {isEditing ? "어떤 새로운 친구가 왔을까요?" : "학생 정보 입력"}
          </h2>
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-800"
          >
            닫기
          </button>
        </div>
        <form onSubmit={handleFormSubmit} className="p-4">
          <div className="flex mb-4">
            <div className="mr-4">
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
                      className="w-24 h-24 object-cover rounded-full border border-[#e9e9e9]"
                    />
                  ) : (
                    <img
                      src={formData.imageUrl}
                      alt="프로필미리보기"
                      className="w-24 h-24 object-cover rounded-full border border-[#e9e9e9]"
                    />
                  )}
                  <div className="absolute bottom-0 right-0 bg-[#397358] rounded-full p-1 cursor-pointer">
                    <img className="w-4 h-4" src={EditIcon} alt="editIcon" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex space-x-4">
                <div className="flex-1 mb-4">
                  <label className="block mb-1">이름</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="flex-1 mb-4">
                  <label className="block mb-1">성별:</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="">성별 선택</option>
                    <option value="남">남</option>
                    <option value="여">여</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1 mb-4">
                  <label className="block mb-1">생년월일</label>
                  <DatePicker
                    name="birthDate"
                    selected={formData.birthDate}
                    onChange={(date) => handleChange(date)}
                    dateFormat="yyyy/MM/dd"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    placeholderText="생년월일을 선택하세요"
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="flex-1 mb-4">
                  <label className="block mb-1">나이</label>
                  <input
                    type="text"
                    value={age}
                    readOnly
                    className="w-full px-3 py-2 border rounded bg-gray-100"
                    placeholder="생년월일 선택 시 자동 계산됩니다"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block">좋아하는 친구</label>
            <p className="text-xs mb-2">
              좋아하는 친구란? 짝꿍과 더 가까이 앉을 수 있어요.
            </p>
            <Select
              name="favoriteFriend"
              isMulti
              value={
                formData.favoriteFriend
                  ? formData.favoriteFriend.map((friendId) =>
                      studentOptions.find((option) => option.value === friendId)
                    )
                  : []
              }
              onChange={(selectedOptions, actionMeta) =>
                handleSelectChange(selectedOptions, actionMeta)
              }
              options={studentOptions}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block">싫어하는 친구</label>
            <p className="text-xs mb-2">
              싫어하는 친구란? 짝꿍과 조금 거리를 둘 수 있어요.
            </p>
            <Select
              name="foughtFriend"
              isMulti
              value={
                formData.foughtFriend
                  ? formData.foughtFriend.map((friendId) =>
                      studentOptions.find((option) => option.value === friendId)
                    )
                  : []
              }
              onChange={(selectedOptions, actionMeta) =>
                handleSelectChange(selectedOptions, actionMeta)
              }
              options={studentOptions}
              className="w-full"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#397358] text-white px-4 py-2 rounded mr-2"
            >
              저장하기
            </button>
            <button
              type="button"
              className="bg-gray-300 text-white px-4 py-2 rounded"
              onClick={toggleSidebar}
            >
              취소하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
