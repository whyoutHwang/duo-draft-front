import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// 계정 설정 페이지 컴포넌트
function Borad() {
  const [activeMenu, setActiveMenu] = useState("profile");
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    classInfo: "",
  });
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-bold mb-8">
        파일 업로드해 학생을 등록해주세요.
      </h2>
      <div className="flex space-x-16">
        <div className="flex flex-col items-center">
          <div className="w-80 h-80 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
          </div>
          <button
            className="px-4 py-2 bg-[#397358] text-white rounded-md hover:bg-[#2c5744]"
            onClick={() => {
              /* Excel 파일 업로드 로직 */
            }}
          >
            Excel 파일 선택
          </button>
          <button
            className="px-4 py-2 bg-[#397358] text-white rounded-md hover:bg-[#2c5744]"
            onClick={() => {
              /* Excel 파일 업로드 로직 */
            }}
          >
            템플릿 다운로드
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-80 h-80 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <button
            className="px-4 py-2 bg-[#397358] text-white rounded-md hover:bg-[#2c5744]"
            onClick={() => {
              /* OCR 이미지 업로드 로직 */
            }}
          >
            OCR 이미지 선택
          </button>
        </div>
      </div>
    </div>
  );
}

export default Borad;
