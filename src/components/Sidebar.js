import React, { useState, useEffect, useRef } from "react";
import styles from "./Sidebar.module.css";
import Select from "react-select";

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
  const [heightError, setHeightError] = useState("");

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

  const [imagePreview, setImagePreview] = useState(formData.imageUrl || "");

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

  const handleHeightChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseInt(value, 10);

    if (!isNaN(numValue)) {
      if (numValue >= 100 && numValue <= 200) {
        setHeightError("");
        handleChange({ target: { name, value: numValue } });
      } else {
        setHeightError("키는 100에서 200 사이의 숫자여야 합니다.");
      }
    } else {
      handleChange({ target: { name, value: "" } });
    }
  };

  const studentOptions = students.map((student) => ({
    value: student._id,
    label: student.name,
  }));

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
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              ref={fileInputRef}
            />
            <div className="mt-2 flex row">
              <div onClick={handleImageClick} className="cursor-pointer">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="프로필 미리보기"
                    className="w-24 h-24 object-cover rounded-full mx-auto"
                  />
                ) : (
                  <img
                    src={formData.imageUrl}
                    alt="프로필 미리보기"
                    className="w-24 h-24 object-cover rounded-full mx-auto"
                  />
                  // <div className="rounded-full w-24 h-24 bg-gray-400"></div>
                )}
              </div>
              <div className="flex flex-col ml-4 self-center items-left">
                <span>{formData.name}</span>
                <span>10년 4월 22일</span>
                <span>{formData.gender} | 12세</span>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">이름:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
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
          {/* <div className="mb-4">
            <label className="block">키</label>
            <p className="text-xs mb-2">
              키를 입력해 놓으면 자리 배치에 더 신경 쓸 수 있어요.
            </p>
            <div className="relative">
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleHeightChange}
                className="w-full px-3 py-2 border rounded"
              />
              <span className="absolute right-3 top-2 text-gray-500">cm</span>
            </div>
            {heightError && (
              <p className="text-red-500 text-xs mt-1">{heightError}</p>
            )}
          </div> */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              저장
            </button>
            <button
              type="button"
              className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded"
              onClick={toggleSidebar}
            >
              닫기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
