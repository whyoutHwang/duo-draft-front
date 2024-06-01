import React from "react";
import { FaTh, FaThList } from "react-icons/fa";

const ToggleButton = ({ viewMode, setViewMode, toggleSidebar }) => (
  <div className="flex items-center space-x-4">
    <button
      className={`p-2 rounded ${viewMode === "card" ? "bg-gray-200" : ""}`}
      onClick={() => setViewMode("card")}
    >
      <FaTh />
    </button>
    <button
      className={`p-2 rounded ${viewMode === "list" ? "bg-gray-200" : ""}`}
      onClick={() => setViewMode("list")}
    >
      <FaThList />
    </button>
    <button className="p-2 rounded bg-gray-200" onClick={toggleSidebar}>
      학생 자리 추가하기
    </button>
  </div>
);

export default ToggleButton;
