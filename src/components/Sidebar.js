import React from "react";

const GENDER_OPTIONS = [
  { value: "", label: "성별 선택" },
  { value: "남", label: "남" },
  { value: "여", label: "여" },
];

const Sidebar = ({
  formData,
  students,
  handleChange,
  handleFormSubmit,
  toggleSidebar,
  isEditing,
}) => (
  <div
    className={`fixed top-0 right-0 w-96 bg-white p-6 rounded-l-lg shadow-lg transform  overflow-y-auto h-screen`}
  >
    <div className="flex justify-between items-center">
      <div className="flex-col">
        <div className="flex">
          <h2 className="font-semibold text-lg">
            {isEditing ? "학생 정보 수정" : "학생 정보 입력"}
          </h2>
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
              {GENDER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>좋아하는 친구:</label>
            <select
              name="favoriteFriend"
              multiple
              value={formData.favoriteFriend}
              onChange={handleChange}
            >
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>싸운 친구:</label>
            <select
              name="foughtFriend"
              multiple
              value={formData.foughtFriend}
              onChange={handleChange}
            >
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center">
            <button type="submit">저장</button>
            <button type="button" className="ml-20" onClick={toggleSidebar}>
              닫기
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default Sidebar;
