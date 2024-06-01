import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FaHome, FaUserFriends, FaCog } from "react-icons/fa";

function Main() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-[#F2EFE8] shadow-md hidden sm:flex sm:flex-col justify-between">
        <div className="flex flex-col items-center mt-8">
          {/* <img src="logo.png" alt="Duo Draft Logo" className="w-16 h-16 mb-4" /> */}
          <div className="w-full flex justify-start mb-4">
            <h1 className="text-xl ml-8 font-bold">Duo Draft</h1>
          </div>
          <div className="my-6 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-2">
              {/* 프로필 사진 자리 */}
            </div>
            <p className="text-center font-medium">Teacher's Name</p>
          </div>
          <nav className="w-full">
            <a
              className={`h-16 flex items-center p-2 rounded-r-full ${
                location.pathname === "/"
                  ? "bg-[#397358] text-white"
                  : "hover:bg-[#397358] hover:text-white"
              }`}
              href="/"
            >
              <FaUserFriends className="w-5 h-5 ml-4" />
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
              <FaHome className="w-5 h-5 ml-4" />
              <span className="ml-3">자리 바꾸기</span>
            </a>
          </nav>
        </div>
        <div className="w-full mb-4">
          <a
            className={`h-16 flex items-center p-2 hover:bg-[#397358] hover:text-white rounded-r-full ${
              location.pathname === "/settings"
                ? "bg-[#397358] text-white"
                : "hover:bg-[#397358] hover:text-white"
            }`}
            href="/settings"
          >
            <FaCog className="w-5 h-5 ml-4" />
            <span className="ml-3">계정 설정</span>
          </a>
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-[#F2EFE8]">
        <div
          className="flex-1 overflow-auto p-16 bg-white"
          style={{ borderTopLeftRadius: "5rem" }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;
