import React from "react";

const StudentCard = ({ student, onClick }) => (
  <div
    className="bg-[#D9D9D9] w-40 h-52 max-w-md rounded-lg shadow-md p-4 m-2 cursor-pointer hover:shadow-lg"
    onClick={() => onClick(student)}
  >
    <div className="w-24 h-24 bg-gray-400 rounded-full mx-auto"></div>
    <h2 className="text-center mt-2 font-semibold">{student.name}</h2>
    <h2 className="text-center mt-1 font-semibold">96년 4월 22일</h2>
    <p className="text-center mt-1 text-sm text-gray-600">
      {student.gender} | 12세
    </p>
  </div>
);

export default StudentCard;
