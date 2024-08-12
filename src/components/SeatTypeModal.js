import React, { useState } from "react";
import aType from "../assets/image/seatType/a-type.png";
import bType from "../assets/image/seatType/b-type.png";
import cType from "../assets/image/seatType/c-type.png";
import dType from "../assets/image/seatType/d-type.png";

const SeatTypeModal = ({ isOpen, onClose, onSave }) => {
  const [selectedType, setSelectedType] = useState(null);

  const seatTypes = [
    { name: "2 분단 타입", seatType: "A", image: aType },
    { name: "3 분단 타입", seatType: "B", image: bType },
    { name: "1-2-1 분단 타입", seatType: "C", image: cType },
    { name: "ㄷ 타입", seatType: "D", image: dType },
  ];

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg ">
          <h2 className="text-xl font-bold mb-4">
            원하는 자리 타입을 선택해 주세요.
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {seatTypes.map((type) => (
              <div
                key={type.name}
                className={`border p-4 rounded cursor-pointer ${
                  selectedType === type.seatType
                    ? "border-[#397358] border-2"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedType(type.seatType)}
              >
                <h3 className="font-bold mb-2">{type.name}</h3>
                <img
                  src={type.image}
                  alt={type.name}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
            >
              취소하기
            </button>
            <button
              onClick={() => {
                onSave(selectedType);
                onClose();
              }}
              className="bg-[#397358] text-white px-4 py-2 rounded"
              disabled={!selectedType}
            >
              변경하기
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default SeatTypeModal;
