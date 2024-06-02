import React, { useEffect, useRef } from "react";
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      setTimeout(() => {
        containerRef.current.classList.remove(styles.hidden);
      }, 250);
    } else {
      document.body.style.overflow = "auto";
      setTimeout(() => {
        containerRef.current.classList.add(styles.hidden);
      }, 300); // 사이드바의 transition 시간과 동일하게 맞추기
    }
  }, [isOpen]);

  const handleSidebarClick = (e) => {
    e.stopPropagation(); // 이벤트 전파 중단
  };
  const handleSelectChange = (selectedOptions, { name }) => {
    const value = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    handleChange({ target: { name, value } });
  };

  const handleContainerClick = (e) => {
    if (e.target === containerRef.current) {
      toggleSidebar();
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
            <label className="block mb-2">이름:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">성별:</label>
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
            <label className="block mb-2">좋아하는 친구:</label>
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
            <label className="block mb-2">싫어하는 친구:</label>
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
