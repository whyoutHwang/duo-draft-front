import React from "react";
import { Outlet } from "react-router-dom";
import authStore from "../../stores/AuthStore";
import {
  FaHome,
  FaTrophy,
  FaUserFriends,
  FaQuestionCircle,
  FaTshirt,
  FaHeadset,
  FaBookOpen,
  FaBriefcase,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

function Main() {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-[#F2EFE8] shadow-md hidden sm:block">
        <div className="">
          <div className="flex-shrink-0 flex items-center justify-start h-16 bg-[#F2EFE8] ml-4">
            Duo Draft
          </div>
          <nav className="flex flex-col">
            <a
              className="flex items-center p-2 mb-4 hover:bg-[#397358] hover:text-white hover:rounded-r-only"
              href="/student-management"
            >
              <FaHome className="w-5 h-5 ml-4" />
              <span className="ml-3">학생 관리</span>
            </a>
            <a
              className="flex items-center p-2 mb-4 hover:bg-[#397358] hover:text-white hover:rounded-r-only"
              href="/seat-change"
            >
              <FaHome className="w-5 h-5 ml-4" />
              <span className="ml-3">자리 바꾸기</span>
            </a>
          </nav>
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
