import React from "react";

const StudentListItem = ({ student, onClick }) => (
  <div
    className="bg-[#D9D9D9] rounded-lg shadow-md p-4 flex items-center cursor-pointer hover:shadow-lg"
    onClick={() => onClick(student)}
  >
    {student.imageUrl ? (
      <img
        src={student.imageUrl}
        alt={`${student.name} 프로필`}
        className="w-16 h-16 object-cover rounded-full"
      />
    ) : (
      <div className="w-16 h-16 bg-gray-400 rounded-full mx-auto"></div>
    )}
    <div className="ml-4">
      <h2 className="text-lg font-semibold">{student.name}</h2>
      <p className="text-sm text-gray-600">{student.gender}</p>
    </div>
  </div>
);

export default StudentListItem;
