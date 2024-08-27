import React from "react";
import { characterImages } from "../constants/characterImages";

const StudentCard = ({ student, onClick }) => {
  const getImageSrc = () => {
    if (student.imageUrl) {
      return student.imageUrl; // 사용자 지정 이미지가 있으면 사용
    }
    return characterImages.Yellow; // 이미지가 없는 경우
  };

  const imageSrc = getImageSrc();

  return (
    <div
      className="bg-[#FDFAF5] w-32 max-w-md rounded-lg shadow-md p-4 m-2 cursor-pointer hover:shadow-lg"
      onClick={() => onClick(student)}
    >
      <div className="w-16 h-16 border border-whtie-300 rounded-full mx-auto overflow-hidden">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={`${student.name} 프로필`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full border border-whtie-300"></div>
        )}
      </div>
      <h2 className="text-center mt-2 font-semibold">{student.name}</h2>
      <p className="text-center text-sm text-gray-600">{student.gender}</p>
    </div>
  );
};

export default StudentCard;
