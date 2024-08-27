import React from "react";

function StudentSeat({ student, size = "m" }) {
  // 기본 크기 (m)를 기준으로 한 비율 설정
  const sizeMultiplier = {
    s: 0.8,
    m: 1,
    l: 1.2,
  };

  const multiplier = sizeMultiplier[size];

  // CSS 변수 정의
  const style = {
    "--width": `${220 * multiplier}px`,
    "--height": `${90 * multiplier}px`,
    "--border-radius": `${24 * multiplier}px`,
    "--image-size": `${64 * multiplier}px`,
    "--font-size": `${12 * multiplier}px`,
    "--drawer-height": `${14 * multiplier}px`,
    "--drawer-bottom": `${24 * multiplier}px`,
    "--drawer-width": `${10 * multiplier}px`,
  };

  return (
    <div
      className="relative m-2"
      style={{ ...style, width: "var(--width)", height: "var(--height)" }}
    >
      <div
        className="absolute bottom-0 w-full h-full flex flex-row items-center justify-center"
        style={{
          background:
            "radial-gradient(ellipse at center, rgb(250, 232, 201) 0%, rgb(235, 193, 136) 100%)",
          borderRadius: "var(--border-radius)",
        }}
      >
        <div
          className="bg-gray-400 rounded-full"
          style={{ width: "var(--image-size)", height: "var(--image-size)" }}
        >
          {student.imageUrl ? (
            <img
              src={student.imageUrl}
              alt={`${student.name} 프로필`}
              className="object-cover rounded-full"
              style={{
                width: "var(--image-size)",
                height: "var(--image-size)",
              }}
            />
          ) : (
            <div
              className="rounded-full"
              style={{
                width: "var(--image-size)",
                height: "var(--image-size)",
              }}
            ></div>
          )}
        </div>
        <div
          className="ml-4 overflow-hidden"
          style={{ width: "var(--image-size)", fontSize: "var(--font-size)" }}
        >
          <p className="font-bold truncate">{student.name}</p>
          <p className="text-gray-500 truncate">{student.gender}</p>
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <div
          className="relative mx-auto"
          style={{
            width: "60%",
            height: "var(--drawer-height)",
            transform: "translateY(100%)",
          }}
        >
          <div
            className="absolute top-0 w-full"
            style={{
              height: "var(--drawer-height)",
              background: "#8B4513",
              zIndex: "6",
              borderRadius: "0 0 14px 14px",
            }}
          ></div>
          <div
            className="absolute left-1/2 rounded-full"
            style={{
              width: "var(--drawer-width)",
              height: `calc(var(--drawer-bottom) + var(--drawer-height))`,
              bottom: `calc(var(--drawer-bottom) * -1)`,
              background: "#6C5745",
              transform: "translateX(-50%)",
              zIndex: "5",
            }}
          ></div>
          <div
            className="absolute w-full rounded-full"
            style={{
              height: "var(--drawer-height)",
              background: "#8B4513",
              zIndex: "6",
              bottom: `calc(var(--drawer-height) * -1.4)`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default StudentSeat;
