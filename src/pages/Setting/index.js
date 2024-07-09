import React, { useState } from "react";
import authStore from "../../stores/AuthStore";
import { useNavigate } from "react-router-dom";
import TeacherImage from "../../assets/image/character/Teacher_1.png";
// 프로필 컴포넌트
const ProfilePanel = ({ user, onSave, onCancel, onLogout }) => (
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

    <div className="flex items-center mb-4">
      <img
        src={user.imageUrl === undefined || TeacherImage}
        alt="프로필"
        className="w-16 h-16 rounded-full mr-4"
      />
      <div>
        <h3 className="font-bold">{user.name}</h3>
        <p>{user.class}</p>
      </div>
    </div>
    <div className="mb-4">
      <label className="block mb-2">이름</label>
      <input
        type="text"
        value={user.name}
        className="w-full p-2 border rounded"
      />
    </div>
    <div className="mb-4">
      <label className="block mb-2">반</label>
      <input
        type="text"
        value={user.class}
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
// 계정 설정 페이지 컴포넌트
function Setting() {
  const [activeMenu, setActiveMenu] = useState("profile");
  const navigate = useNavigate();

  // 임시 사용자 데이터
  const user = {
    name: "황인준",
    class: "3학년 2반",
    imageUrl: "https://example.com/profile.jpg", // 실제 이미지 URL로 교체 필요
  };

  const handleSave = () => {
    // 저장 로직 구현
    console.log("저장됨");
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

  return (
    <div className="flex flex-col h-screen bg-white p-16">
      <h1 className="text-2xl font-bold mb-6">프로필 수정 및 설정</h1>
      {/* 좌측 메뉴 */}
      <div className="flex mt-4">
        <div className="w-1/4 pr-8">
          <ul>
            <li
              className={`cursor-pointer p-2 ${
                activeMenu === "profile" ? "bg-gray-200" : ""
              }`}
              onClick={() => setActiveMenu("profile")}
            >
              선생님 프로필
            </li>
            <li
              className={`cursor-pointer p-2 ${
                activeMenu === "account" ? "bg-gray-200" : ""
              }`}
              onClick={() => setActiveMenu("account")}
            >
              계정 관리
            </li>
          </ul>
        </div>

        {/* 우측 패널 */}
        <div className="w-3/4">
          {activeMenu === "profile" && (
            <ProfilePanel
              user={user}
              onSave={handleSave}
              onCancel={handleCancel}
              onLogout={handleLogout}
            />
          )}
          {activeMenu === "account" && <div>계정 관리 내용</div>}
        </div>
      </div>
    </div>
  );
}

export default Setting;
