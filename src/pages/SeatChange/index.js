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
import SeatTypeModal from "../../components/SeatTypeModal";

function SeatChange() {
  const [pairs, setPairs] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [isSeatTypeModalOpen, setIsSeatTypeModalOpen] = useState(false);
  const [previousPairsMap, setPreviousPairsMap] = useState(new Map());
  const { showAnimation, setShowAnimation, canvasRef, startAnimation } =
    useAnimation();
  const [seatType, setSeatType] = useState("A");

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

  const handleEditMode = () => {
    setEditMode(true);
  };
  const handleSeatType = () => {
    setIsSeatTypeModalOpen(true);
  };

  const handleSaveSeatType = (newSeatType) => {
    setSeatType(newSeatType);
    // Here you would implement the logic to rearrange the seats based on the new type
  };

  const handleShufflePairs = () => {
    startAnimation();
    setTimeout(shufflePairs, 3000);
  };

  const renderPairs = () => {
    switch (seatType) {
      case "A":
        return renderTwoColumns();
      case "B":
        return renderThreeColumns();
      case "C":
        return render121Layout();
      case "D":
        return renderUShape();
      default:
        return renderTwoColumns(); // Default to 2 columns
    }
  };

  const renderTwoColumns = () => {
    const midpoint = Math.ceil(pairs.length / 2);
    return (
      <div className="flex justify-around" style={{ gap: "4rem" }}>
        <Section pairs={pairs.slice(0, midpoint)} title="1분단" />
        <Section pairs={pairs.slice(midpoint)} title="2분단" />
      </div>
    );
  };

  const renderThreeColumns = () => {
    const columnSize = Math.ceil(pairs.length / 3);
    return (
      <div className="flex justify-between " style={{ gap: "4rem" }}>
        <Section pairs={pairs.slice(0, columnSize)} title="1분단" />
        <Section
          pairs={pairs.slice(columnSize, columnSize * 2)}
          title="2분단"
        />
        <Section pairs={pairs.slice(columnSize * 2)} title="3분단" />
      </div>
    );
  };

  const render121Layout = () => {
    const totalStudents = pairs.reduce(
      (count, pair) =>
        count + (pair.student1 ? 1 : 0) + (pair.student2 ? 1 : 0),
      0
    );
    const rowCount = Math.ceil(totalStudents / 4);

    const leftColumn = [];
    const centerColumn = [];
    const rightColumn = [];

    let studentIndex = 0;
    for (let i = 0; i < rowCount; i++) {
      if (studentIndex < totalStudents) {
        leftColumn.push({
          student1: getStudentAt(studentIndex),
          student2: null,
        });
        studentIndex++;
      }

      if (studentIndex < totalStudents - 1) {
        centerColumn.push({
          student1: getStudentAt(studentIndex),
          student2: getStudentAt(studentIndex + 1),
        });
        studentIndex += 2;
      } else if (studentIndex < totalStudents) {
        centerColumn.push({
          student1: getStudentAt(studentIndex),
          student2: null,
        });
        studentIndex++;
      }

      if (studentIndex < totalStudents) {
        rightColumn.push({
          student1: getStudentAt(studentIndex),
          student2: null,
        });
        studentIndex++;
      }
    }

    return (
      <div className="flex justify-between">
        <Section pairs={leftColumn} title="1분단" size="s" />
        <Section pairs={centerColumn} title="2분단" size="s" />
        <Section pairs={rightColumn} title="3분단" size="s" />
      </div>
    );
  };

  // const getStudentAt = (index) => {
  //   let count = 0;
  //   for (const pair of pairs) {
  //     if (count === index) return pair.student1;
  //     count++;
  //     if (pair.student2) {
  //       if (count === index) return pair.student2;
  //       count++;
  //     }
  //   }
  //   return null;
  // };

  const renderUShape = () => {
    const totalStudents = pairs.reduce(
      (count, pair) =>
        count + (pair.student1 ? 1 : 0) + (pair.student2 ? 1 : 0),
      0
    );

    const sideCount = Math.floor(totalStudents / 4);
    const bottomCount = totalStudents - sideCount * 2;
    const bottomRowCount = Math.ceil(bottomCount / 2);

    const leftColumn = [];
    const rightColumn = [];
    const bottomRows = [[], []];

    let studentIndex = 0;

    // 왼쪽 열 채우기
    for (let i = 0; i < sideCount; i++) {
      leftColumn.push({ student1: getStudentAt(studentIndex), student2: null });
      studentIndex++;
    }

    // 오른쪽 열 채우기
    for (let i = 0; i < sideCount; i++) {
      rightColumn.push({
        student1: getStudentAt(studentIndex),
        student2: null,
      });
      studentIndex++;
    }

    // 하단 두 줄 채우기
    for (let i = 0; i < bottomCount; i++) {
      const rowIndex = i < bottomRowCount ? 0 : 1;
      bottomRows[rowIndex].push({
        student1: getStudentAt(studentIndex),
        student2: null,
      });
      studentIndex++;
    }

    return (
      <div className="flex flex-col items-center">
        <div className="flex justify-between w-full mb-8">
          <Section pairs={leftColumn} title="왼쪽" className="w-1/4" size="s" />
          <Section
            pairs={rightColumn}
            title="오른쪽"
            className="w-1/4"
            size="s"
          />
        </div>
        <div className="w-full">
          <Section
            size="s"
            pairs={bottomRows[0]}
            title="하단 (상단 줄)"
            className="w-full mb-4"
          />
          <Section
            size="s"
            pairs={bottomRows[1]}
            title="하단 (하단 줄)"
            className="w-full"
          />
        </div>
      </div>
    );
  };

  const getStudentAt = (index) => {
    let count = 0;
    for (const pair of pairs) {
      if (count === index) return pair.student1;
      count++;
      if (pair.student2) {
        if (count === index) return pair.student2;
        count++;
      }
    }
    return null;
  };

  return (
    <div className="container mx-auto bg-white p-16">
      <h1 className="text-2xl font-bold text-left mb-6">학생 자리 배치</h1>
      <div className="flex justify-end mb-12">
        {!editMode ? (
          <button
            onClick={handleEditMode}
            className="bg-[#397358] text-white px-4 py-2 rounded"
          >
            자리 바꾸기
          </button>
        ) : (
          <>
            <button
              onClick={handleSeatType}
              className="bg-[#397358] text-white px-4 py-2 rounded mr-2"
            >
              자리 타입 설정
            </button>
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
      <SeatTypeModal
        isOpen={isSeatTypeModalOpen}
        onClose={() => setIsSeatTypeModalOpen(false)}
        onSave={handleSaveSeatType}
      />
    </div>
  );
}

function Section({ pairs, title, className = "", size = "m" }) {
  console.log(size);

  return (
    <div className={`${className}`}>
      <h2 className="text-center font-bold mb-4">{title}</h2>
      <div
        className={
          title.includes("하단") ? "flex flex-wrap justify-center" : ""
        }
      >
        {pairs.map((pair, index) => (
          <div key={index} className="flex mb-4 justify-center">
            <StudentSeat student={pair.student1} size={size} />
            {pair.student2 && (
              <StudentSeat student={pair.student2} size={size} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeatChange;
