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
  // useEffect(() => {
  //   console.log("로그인 상태:", authStore.isLoggedIn);
  // }, [authStore.isLoggedIn, authStore.user]);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white dark:bg-gray-800 shadow-md hidden sm:block">
        <div className="text-gray-700 dark:text-gray-400">
          <div className="flex-shrink-0 flex items-center justify-center h-16 bg-red-500 text-white">
            Duo Draft
          </div>
          <nav className="flex flex-col p-4">
            <a
              className="flex items-center p-2 mb-4 text-gray-700 rounded-lg dark:text-gray-200 hover:bg-red-500 hover:text-white"
              href="/student-management"
            >
              <FaHome className="w-5 h-5" />
              <span className="ml-3">학생 관리</span>
            </a>
            <a
              className="flex items-center p-2 mb-4 text-gray-700 rounded-lg dark:text-gray-200 hover:bg-red-500 hover:text-white"
              href="/seat-change"
            >
              <FaHome className="w-5 h-5" />
              <span className="ml-3">자리 바꾸기</span>
            </a>

            {/* <div className="mt-auto flex items-center justify-center p-4">
              <FaFacebookF className="text-blue-600 mx-2" />
              <FaInstagram className="text-pink-500 mx-2" />
              <FaTwitter className="text-blue-400 mx-2" />
            </div> */}
          </nav>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col">
        {/* Navigation bar */}
        <div className="flex-shrink-0 h-16 bg-white shadow-md flex items-center px-4">
          <span className="text-xl text-gray-800">Main Page</span>
        </div>
        {/* Main content */}
        <div className="flex-1 overflow-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;
