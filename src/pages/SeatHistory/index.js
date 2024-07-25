import React, { useState, useEffect } from "react";
import {
  getPairHistoryList,
  getSelectedPairHistory,
} from "../../service/apiService";
import AuthStore from "../../stores/AuthStore";

function SeatHistory() {
  const [historyList, setHistoryList] = useState([]);
  const [currentPairs, setCurrentPairs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const midpoint = Math.ceil(currentPairs.length / 2);
  const section1Pairs = currentPairs.slice(0, midpoint);
  const section2Pairs = currentPairs.slice(midpoint);

  useEffect(() => {
    const fetchPairHistory = async () => {
      setIsLoading(true);
      try {
        const teacherId = AuthStore.user._id;
        const response = await getPairHistoryList(teacherId);
        setHistoryList(response);
        handleHistoryClick(response[0]);
      } catch (error) {
        console.error("Failed to fetch pair history:", error);
        if (error.response && error.response.status === 404) {
          // 404 에러 처리
        } else {
          console.error("Failed to fetch data:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPairHistory();
  }, []);

  const handleHistoryClick = async (item) => {
    try {
      const teacherId = AuthStore.user._id;
      const response = await getSelectedPairHistory(teacherId, item._id);
      setCurrentPairs(response.pairs);
    } catch (error) {
      console.error("Failed to fetch specific pair history:", error);
    }
  };

  function StudentCard({ student }) {
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
              }} // 어두운 갈색
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
              style={{ background: "#8B4513", zIndex: "6", bottom: "-20px" }} // 어두운 갈색
            ></div>
          </div>
        </div>
      </div>
    );
  }

  function Pair({ pair }) {
    return (
      <div className="flex justify-center mb-12">
        <StudentCard student={pair.student1} />
        {pair.student2 && <StudentCard student={pair.student2} />}
      </div>
    );
  }

  function Section({ pairs, title }) {
    return (
      <div className="w-1/2">
        <h2 className="text-center font-bold mb-4">{title}</h2>
        {pairs.map((pair, index) => (
          <Pair key={index} pair={pair} />
        ))}
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}월 ${String(date.getDate()).padStart(2, "0")}일 - ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  if (isLoading) {
    return <div>데이터를 불러오는 중...</div>;
  }

  return (
    <div className="container mx-auto bg-white p-16">
      <div className="flex w-full flex-col">
        <h2 className="text-2xl font-bold mb-4">
          자리 기록 히스토리 확인해보세요
        </h2>
        <div className="flex">
          <div className="flex-2 bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">히스토리</h3>
            <ul>
              {historyList.map((item, index) => (
                <li
                  key={index}
                  className="mb-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                  onClick={() => handleHistoryClick(item)}
                >
                  {formatDate(item.date)}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-center">
              <button className="mx-1 px-3 py-1 bg-gray-200 rounded">1</button>
              <button className="mx-1 px-3 py-1 bg-gray-200 rounded">2</button>
              <button className="mx-1 px-3 py-1 bg-gray-200 rounded">3</button>
            </div>
          </div>
          <div className="flex-1 pl-8">
            <div className="bg-white rounded-lg shadow">
              <div className="flex justify-between border rounded border-gray-100 p-4 bg-[#FDFAF5]">
                <Section pairs={section1Pairs} title="1분단" />
                <Section pairs={section2Pairs} title="2분단" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeatHistory;
