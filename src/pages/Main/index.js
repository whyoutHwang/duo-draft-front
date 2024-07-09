/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import authStore from "../../stores/AuthStore";
import { useNavigate } from "react-router-dom";
import Teacher from "../../assets/image/character/Teacher_1.png";
import LOGO from "../../assets/image/logo/logo.svg";
import iconAboutUs from "../../assets/image/icons/icon-about-us.svg";
import iconAddPeople from "../../assets/image/icons/icon-add-people.svg";
import iconChangeSeat from "../../assets/image/icons/icon-change-seat.svg";
import iconHistory from "../../assets/image/icons/icon-history.svg";
import iconLogout from "../../assets/image/icons/icon-logout.svg";
function Main() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/settings");
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
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-[#F2EFE8] shadow-md hidden sm:flex sm:flex-col justify-between">
        <div className="flex flex-col items-center mt-8">
          <div className="w-full flex items-center justify-start mb-4 ml-8 ">
            <img src={LOGO} alt={"logo"} className="w-8 h-8 object-contain" />
            <h1 className="ml-4 text-xl font-bold">Duo Draft</h1>
          </div>

          <nav className="w-full mt-24">
            <a
              className={`h-16 flex items-center p-2 rounded-r-full ${
                location.pathname === "/"
                  ? "bg-[#397358] text-white"
                  : "hover:bg-[#397358] hover:text-white"
              }`}
              href="/"
            >
              <img
                className="w-5 h-5 ml-4"
                src={iconAddPeople}
                alt="aboutUsIcon"
              />
              <span className="ml-3">새로운 친구</span>
            </a>
            <a
              className={`h-16 flex items-center p-2 rounded-r-full ${
                location.pathname === "/seat-change"
                  ? "bg-[#397358] text-white"
                  : "hover:bg-[#397358] hover:text-white"
              }`}
              href="/seat-change"
            >
              <img
                className="w-5 h-5 ml-4"
                src={iconChangeSeat}
                alt="aboutUsIcon"
              />
              <span className="ml-3">자리 바꾸기</span>
            </a>
          </nav>
        </div>
        <div className="w-full mt-auto p-4">
          <a className="h-16 flex items-center rounded-r-full cursor-pointer">
            <img className="w-5 h-5" src={iconAboutUs} alt="aboutUsIcon" />
            <span className="ml-3">듀오 드래프트란?</span>
          </a>
          <div className="h-1 border-t border-gray-200 mb-4"></div>
          <div className="flex items-center justify-between">
            <div
              className="flex items-center cursor-pointer"
              onClick={handleClick}
            >
              <img
                src={"" || Teacher}
                alt="Profile"
                className="w-12 h-12 object-cover rounded-full border-2 border-gray-300"
                style={{ borderRadius: "50%" }}
              />
              <div className="ml-4">
                <div>
                  <span style={{ color: "#397358" }}>{"황인준"} </span>
                  <span>선생님</span>
                </div>
                <p className="text-sm">{"3학년 2반"}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-[#397358]"
              title="로그아웃"
            >
              <img
                className="w-5 h-5 ml-4"
                src={iconLogout}
                alt="logout button"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col bg-[#F2EFE8]">
        <div
          className="flex-1 overflow-auto  bg-white"
          style={{ borderTopLeftRadius: "5rem" }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;
