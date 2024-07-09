/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import Teacher from "../../assets/image/character/Teacher_1.png";
import LOGO from "../../assets/image/logo/logo.svg";
import iconAboutUs from "../../assets/image/icons/icon-about-us.svg";
import { NAV_ITEMS } from "../../constants/constants";
import PropTypes from "prop-types";

import iconLogout from "../../assets/image/icons/icon-logout.svg";
function Main() {
  const location = useLocation();
  const navigate = useNavigate();

  const NavItem = ({ path, icon, iconActive, label, currentPath }) => (
    <>
      <a
        className={`h-16 flex items-center p-2 rounded-r-full ${
          currentPath === path
            ? "bg-[#397358] text-white"
            : "hover:bg-[#397358] hover:text-white"
        }`}
        href={path}
      >
        <img
          className="w-5 h-5 ml-4"
          src={currentPath === path ? iconActive : icon}
          alt={`${label} icon`}
        />
        <span className="ml-3">{label}</span>
      </a>
    </>
  );

  NavItem.propTypes = {
    path: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    currentPath: PropTypes.string.isRequired,
  };

  const UserInfo = ({ handleClick }) => (
    <div className="flex items-center justify-between" onClick={handleClick}>
      <div className="flex items-center cursor-pointer">
        <img
          src={Teacher}
          alt="Profile"
          className="w-12 h-12 object-cover rounded-full border-2 border-gray-300"
        />
        <div className="ml-4">
          <div>
            <span style={{ color: "#397358" }}>황인준 </span>
            <span>선생님</span>
          </div>
          <p className="text-sm">3학년 2반</p>
        </div>
      </div>
      <button className="text-gray-500 hover:text-[#397358]" title="설정">
        <img className="w-5 h-5 ml-4" src={iconLogout} alt="logout button" />
      </button>
    </div>
  );

  UserInfo.propTypes = {
    handleClick: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired,
  };

  const handleClick = () => {
    navigate("/setting");
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
            {NAV_ITEMS.map((item) => (
              <NavItem
                key={item.path}
                {...item}
                currentPath={location.pathname}
              />
            ))}
          </nav>
        </div>
        <div className="w-full mt-auto p-4">
          <a className="h-16 flex items-center rounded-r-full cursor-pointer">
            <img className="w-5 h-5" src={iconAboutUs} alt="aboutUsIcon" />
            <span className="ml-3">듀오 드래프트란?</span>
          </a>
          <div className="h-1 border-t border-gray-200 mb-4"></div>
          <UserInfo handleClick={handleClick} />
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
