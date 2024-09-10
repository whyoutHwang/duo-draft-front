import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaCog } from "react-icons/fa";
import AuthStore from "../../stores/AuthStore";
import { createStudentsBatch } from "../../service/apiService";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

// 계정 설정 페이지 컴포넌트
function ExcelUpload() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [excelData, setExcelData] = useState(null);

  const characterImageNames = [
    "Yellow",
    "Red",
    "Green",
    "Pink-1",
    "LightGreen",
    "Skin",
    "Yellow_2",
    "LightPurple",
    "Mint",
    "LightBrown",
    "Purple",
    "Gray",
    "Orange",
    "Pink",
  ];

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setExcelData(json);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const downloadTemplate = () => {
    const templateUrl =
      "https://duodraft-test.s3.ap-northeast-2.amazonaws.com/add_student_template.xlsx";

    // 파일 다운로드를 위한 임시 링크 생성
    const link = document.createElement("a");
    link.href = templateUrl;
    link.setAttribute("download", "add_student_template.xlsx"); // 다운로드될 파일명 설정
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getRandomCharacterImageName = () => {
    const randomIndex = Math.floor(Math.random() * characterImageNames.length);
    return characterImageNames[randomIndex];
  };

  const handleRegister = async () => {
    if (!excelData || excelData.length < 2) {
      alert("등록할 학생 데이터가 없습니다.");
      return;
    }

    const headers = excelData[0];
    const studentsData = excelData.slice(1).map((row) => {
      const student = {};
      headers.forEach((header, index) => {
        // eslint-disable-next-line default-case
        switch (header) {
          case "이름(홍길동)":
            student.name = row[index];
            break;
          case "성별(남/녀)":
            student.gender = row[index] === "남" ? "남" : "여";
            break;
          case "생년월일(900801)":
            // 생년월일을 Date 객체로 변환
            const birthDate = new Date(
              row[index]
                .toString()
                .replace(/(\d{2})(\d{2})(\d{2})/, "19$1-$2-$3")
            );
            student.birthDate = birthDate.toISOString();
            break;
        }
      });
      student.defaultImage = getRandomCharacterImageName();
      student.imageUrl = null;
      student.favorite_friend = [];
      student.fought_friend = [];
      return student;
    });

    try {
      const result = await createStudentsBatch(
        studentsData,
        AuthStore.user._id
      );
      alert(`${result.length}명의 학생이 성공적으로 등록되었습니다.`);
      setExcelData(null);
    } catch (error) {
      console.error("학생 등록 중 오류 발생:", error);
      alert("학생 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      {!excelData ? (
        <div className="flex flex-col items-center justify-center h-full p-8">
          <h2 className="text-2xl font-bold mb-24">
            파일 업로드해 학생을 등록해주세요.
          </h2>
          <div className="flex space-x-16">
            <div
              className="flex flex-col items-center p-12 border bg-gray-100"
              style={{ borderRadius: "12px", border: "2px dashed #D9D9D9" }}
            >
              <span className="text-xl">Excel</span>
              <div className="w-80 h-80  rounded-lg flex items-center justify-center ">
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
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".xlsx,.xls,.csv"
                style={{ display: "none" }}
              />
              <div className="flex flex-row">
                <button
                  className="px-4 py-2 bg-[#397358] text-white rounded-md hover:bg-[#2c5744]"
                  onClick={triggerFileInput}
                >
                  Excel 파일 선택
                </button>
                <button
                  className="ml-2 px-4 py-2 bg-[#397358] text-white rounded-md hover:bg-[#2c5744]"
                  onClick={downloadTemplate}
                >
                  템플릿 다운로드
                </button>
              </div>
            </div>
            <div
              className="flex flex-col items-center p-12 border bg-gray-100"
              style={{ borderRadius: "12px", border: "2px dashed #D9D9D9" }}
            >
              <span className="text-xl">직접 등록하기</span>
              <div className="w-80 h-80 rounded-lg flex items-center justify-center ">
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
      ) : (
        <div className="container mx-auto bg-white p-16">
          <h2 className="text-2xl font-bold mb-24">Excel 미리보기</h2>
          <div className="w-full">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    {excelData[0].map((header, index) => (
                      <th
                        key={index}
                        className="border border-gray-300 px-4 py-2"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {excelData.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border border-gray-300 px-4 py-2"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4 space-x-4">
              <button
                className="px-4 py-2 bg-[#B85C5C] text-white rounded-md hover:bg-[#9C4A4A]"
                onClick={() => setExcelData(null)}
              >
                파일 다시 선택
              </button>
              <button
                className="px-4 py-2 bg-[#397358] text-white rounded-md hover:bg-[#2c5744]"
                onClick={handleRegister}
              >
                등록하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ExcelUpload;
