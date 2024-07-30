import React from "react";
import { characterImages } from "../constants/characterImages";

const StudentListItem = ({ student, onClick }) => {
  const getImageSrc = () => {
    if (student.imageUrl) {
      return student.imageUrl; // 사용자 지정 이미지가 있으면 사용
    } else if (student.defaultImage) {
      return characterImages[student.defaultImage];
    }
    return null; // 이미지가 없는 경우
  };

  const imageSrc = getImageSrc();
  return (
    <div
      className="bg-[#D9D9D9] rounded-lg shadow-md p-4 flex items-center cursor-pointer hover:shadow-lg"
      onClick={() => onClick(student)}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
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
};

export default StudentListItem;
