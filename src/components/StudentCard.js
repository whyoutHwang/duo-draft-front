import React from "react";

const StudentCard = ({ student }) => (
  <div className="bg-[#D9D9D9] rounded-lg shadow-md p-4 m-2">
    <div className="w-16 h-16 bg-gray-400 rounded-full mx-auto"></div>
    <h2 className="text-center mt-2 font-semibold">{student.name}</h2>
    <p className="text-center text-sm text-gray-600">{student.gender}</p>
  </div>
);

export default StudentCard;
