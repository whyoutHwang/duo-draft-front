import React, { useState, useEffect } from "react";
import { getPairHistory, getStudent } from "../../service/apiService";
import AuthStore from "../../stores/AuthStore";
function SeatChange() {
  const mockPairs = [
    {
      student1: { id: "1", name: "학생1" },
      student2: { id: "2", name: "학생2" },
    },
    {
      student1: { id: "3", name: "학생3" },
      student2: { id: "4", name: "학생4" },
    },
    {
      student1: { id: "5", name: "학생5" },
      student2: { id: "6", name: "학생6" },
    },
    {
      student1: { id: "7", name: "학생7" },
      student2: { id: "8", name: "학생8" },
    },
    {
      student1: { id: "9", name: "학생9" },
      student2: { id: "10", name: "학생10" },
    },
    {
      student1: { id: "11", name: "학생13" },
      student2: { id: "12", name: "학생9" },
    },
    {
      student1: { id: "13", name: "학생117" },
      student2: { id: "14", name: "학생3" },
    },
    {
      student1: { id: "15", name: "학생13" },
      student2: { id: "16", name: "학생9" },
    },
    {
      student1: { id: "17", name: "학생13" },
      student2: { id: "18", name: "학생9" },
    },
  ];

  const [pairs, setPairs] = useState(mockPairs);
  const [tempPairs, setTempPairs] = useState([...mockPairs]);
  const [editMode, setEditMode] = useState(false);

  const midpoint = Math.ceil(pairs.length / 2);
  const section1Pairs = pairs.slice(0, midpoint);
  const section2Pairs = pairs.slice(midpoint);

  useEffect(() => {
    const fetchPairHistory = async () => {
      try {
        const teacherId = AuthStore.user._id;
        const response = await getPairHistory(teacherId);
        const pairHistory = response.data;
        setPairs(pairHistory.pairs);
        setTempPairs(pairHistory.pairs);
      } catch (error) {
        console.error("Failed to fetch pair history:", error);
        if (error.response && error.response.status === 404) {
          // pair 히스토리가 없는 경우, 학생 데이터를 가져와서 초기화
          const teacherId = AuthStore.user._id;
          const students = await getStudent(teacherId);
          const initialPairs = [];

          for (let i = 0; i < students.length; i += 2) {
            const student1 = students[i];
            const student2 = students[i + 1] || null;
            initialPairs.push({ student1, student2 });
          }

          setPairs(initialPairs);
          setTempPairs(initialPairs);
        } else {
          console.error("Failed to fetch data:", error);
        }
      }
    };

    fetchPairHistory();
  }, []);

  function shufflePairs() {
    const shuffled = [...pairs];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setTempPairs(shuffled);
    setEditMode(true);
    setPairs(shuffled);
  }

  async function handleSave() {
    const confirmSave = window.confirm("저장하시겠습니까?");
    if (confirmSave) {
      try {
        // API 호출 로직 추가
        const response = await fetch("/api/savePairs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tempPairs),
        });

        if (response.ok) {
          setPairs(tempPairs);
          setEditMode(false);
          alert("저장되었습니다.");
        } else {
          alert("저장에 실패했습니다.");
        }
      } catch (error) {
        console.error("API 호출 에러:", error);
        alert("저장에 실패했습니다.");
      }
    }
  }
  function handleCancel() {
    setTempPairs([...pairs]);
    setEditMode(false);
  }

  function StudentCard({ student }) {
    return (
      <div className="bg-white shadow p-4 rounded m-2">
        <h4 className="text-lg">{student.name}</h4>
      </div>
    );
  }

  function Pair({ pair }) {
    return (
      <div className="flex justify-center">
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-left mb-6">학생 자리 배치</h1>
      <div className="flex justify-end">
        {!editMode ? (
          <button
            onClick={shufflePairs}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            자리 바꾸기
          </button>
        ) : (
          <>
            <button
              onClick={shufflePairs}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              자리 바꾸기
            </button>
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              저장하기
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded "
            >
              취소
            </button>
          </>
        )}
      </div>
      <div className="flex justify-between mt-6">
        <Section pairs={section1Pairs} title="1분단" />
        <Section pairs={section2Pairs} title="2분단" />
      </div>
    </div>
  );
}

export default SeatChange;
