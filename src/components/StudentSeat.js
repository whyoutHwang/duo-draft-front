import React from "react";

function StudentSeat({ student }) {
  return (
    <div className="relative w-[220px] h-[90px] m-2">
      <div
        className="absolute bottom-0 w-full h-full rounded-tl-[22.45px] flex flex-row items-center justify-center"
        style={{
          background:
            "radial-gradient(ellipse at center, rgb(250, 232, 201) 0%,  rgb(235, 193, 136) 100%)",
          transformOrigin: "top left",
          borderRadius: "24px",
        }}
      >
        <div className="w-16 h-16 bg-gray-400 rounded-full">
          {student.imageUrl ? (
            <img
              src={student.imageUrl}
              alt={`${student.name} 프로필`}
              className="w-16 h-16 object-cover rounded-full"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
          )}
        </div>
        <div className="w-16 ml-4 text-xs overflow-hidden">
          <p className="font-bold truncate">{student.name}</p>
          <p className="text-gray-500 truncate">{student.gender}</p>
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <div
          className="relative h-[20px] mx-auto"
          style={{ width: "60%", transform: "translateY(100%)" }}
        >
          <div
            className="absolute top-0 w-full h-[20px]"
            style={{
              background: "#8B4513",
              zIndex: "6",
              borderRadius: "0 0 14px 14px",
            }}
          ></div>
          <div
            className="absolute left-1/2 w-[10px] h-[40px] rounded-full"
            style={{
              bottom: "-24px",
              background: "#6C5745",
              transform: "translateX(-50%)",
              zIndex: "5",
            }}
          ></div>
          <div
            className="absolute w-full h-[10px] rounded-full"
            style={{ background: "#8B4513", zIndex: "6", bottom: "-20px" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default StudentSeat;
