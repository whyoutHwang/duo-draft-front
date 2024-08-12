import React, { useState, useEffect } from "react";
import {
  getPairHistory,
  getStudent,
  savePairHistory,
} from "../../service/apiService";
import AuthStore from "../../stores/AuthStore";
import useAnimation from "../../hooks/useAnimation";
import AnimationCanvas from "./AnimationCanvas";
import StudentSeat from "../../components/StudentSeat";

function SeatChange() {
  const [pairs, setPairs] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [previousPairsMap, setPreviousPairsMap] = useState(new Map());
  const { showAnimation, setShowAnimation, canvasRef, startAnimation } =
    useAnimation();

  useEffect(() => {
    fetchPairHistory();
  }, []);

  const fetchPairHistory = async () => {
    try {
      const teacherId = AuthStore.user._id;
      const response = await getPairHistory(teacherId);
      const { pairs, previousPairsMap } = response.data;

      setPairs(pairs);
      setPreviousPairsMap(new Map(Object.entries(previousPairsMap)));
    } catch (error) {
      console.error("Failed to fetch pair history:", error);
      if (error.response?.status === 404) {
        initializeWithStudents();
      }
    }
  };

  const initializeWithStudents = async () => {
    try {
      const teacherId = AuthStore.user._id;
      const students = await getStudent(teacherId);
      const initialPairs = createInitialPairs(students);
      setPairs(initialPairs);
    } catch (error) {
      console.error("Failed to initialize with students:", error);
    }
  };

  const createInitialPairs = (students) => {
    return students.reduce((acc, student, index, array) => {
      if (index % 2 === 0) {
        acc.push({ student1: student, student2: array[index + 1] || null });
      }
      return acc;
    }, []);
  };

  const shufflePairs = () => {
    const allStudents = pairs
      .flatMap((pair) => [pair.student1, pair.student2])
      .filter(Boolean);
    const shuffledStudents = shuffleArray(allStudents);
    const newPairs = createPairsFromShuffledStudents(shuffledStudents);

    setPairs(newPairs);
    setEditMode(true);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const createPairsFromShuffledStudents = (students) => {
    const newPairs = [];
    for (let i = 0; i < students.length; i += 2) {
      newPairs.push({
        student1: students[i],
        student2: students[i + 1] || null,
      });
    }
    return newPairs;
  };

  const handleSave = async () => {
    if (window.confirm("저장하시겠습니까?")) {
      try {
        const response = await savePairHistory(AuthStore.user._id, pairs);
        if (response.status === 201) {
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
  };

  const handleCancel = () => {
    fetchPairHistory();
    setEditMode(false);
  };

  const handleShufflePairs = () => {
    startAnimation();
    setTimeout(shufflePairs, 3000);
  };

  const renderPairs = () => {
    const midpoint = Math.ceil(pairs.length / 2);
    const section1Pairs = pairs.slice(0, midpoint);
    const section2Pairs = pairs.slice(midpoint);

    return (
      <div className="flex justify-between border rounded border-gray-100 p-4 bg-[#FDFAF5] mt-6">
        <Section pairs={section1Pairs} title="1분단" />
        <Section pairs={section2Pairs} title="2분단" />
      </div>
    );
  };

  return (
    <div className="container mx-auto bg-white p-16">
      <h1 className="text-2xl font-bold text-left mb-6">학생 자리 배치</h1>
      <div className="flex justify-end">
        {!editMode ? (
          <button
            onClick={handleShufflePairs}
            className="bg-[#397358] text-white px-4 py-2 rounded"
          >
            자리 바꾸기
          </button>
        ) : (
          <>
            <button
              onClick={handleShufflePairs}
              className="bg-[#397358] text-white px-4 py-2 rounded mr-2"
            >
              자리 바꾸기
            </button>
            <button
              onClick={handleSave}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              저장하기
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              취소
            </button>
          </>
        )}
      </div>
      {renderPairs()}
      {showAnimation && (
        <AnimationCanvas
          showAnimation={showAnimation}
          setShowAnimation={setShowAnimation}
          canvasRef={canvasRef}
        />
      )}
    </div>
  );
}

function Section({ pairs, title }) {
  return (
    <div className="w-1/2">
      <h2 className="text-center font-bold mb-4">{title}</h2>
      {pairs.map((pair, index) => (
        <div key={index} className="flex justify-center mb-12">
          <StudentSeat student={pair.student1} />
          {pair.student2 && <StudentSeat student={pair.student2} />}
        </div>
      ))}
    </div>
  );
}

export default SeatChange;
